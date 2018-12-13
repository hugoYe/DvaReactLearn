import React, { PureComponent } from "react";
import { withI18n } from "@lingui/react";
import { connect } from "dva";
import { Row, Col, Button, Popconfirm } from "antd";
import { Page } from "components";
import { router } from "utils";
import { stringify } from "qs";
import List from "./components/List";
import Modal from "./components/Modal";

@withI18n()
@connect(({ app, channels, loading }) => ({ app, channels, loading }))
class Channels extends PureComponent {
  render() {
    const { location, dispatch, channels, loading, i18n } = this.props;
    const { query, pathname } = location;
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      selectedRowKeys
    } = channels;

    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery
          },
          { arrayFormat: "repeat" }
        )
      });
    };

    const modalProps = {
      item: modalType === "create" ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`channels/${modalType}`],
      title: `${
        modalType === "create" ? i18n.t`Create Channel` : i18n.t`Update Channel`
      }`,
      wrapClassName: "vertical-center-modal",
      onOk(data) {
        dispatch({
          type: `channels/${modalType}`,
          payload: data
        }).then(() => {
          handleRefresh();
        });
      },
      onCancel() {
        dispatch({
          type: "channels/hideModal"
        });
      }
    };

    const listProps = {
      dataSource: list,
      loading: loading.effects["channels/query"],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize
        });
      },
      onDeleteItem(channelId) {
        dispatch({
          type: "channels/delete",
          payload: channelId
        }).then(() => {
          handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current
          });
        });
      },
      onEditItem(item) {
        dispatch({
          type: "channels/showModal",
          payload: {
            modalType: "update",
            currentItem: item
          }
        });
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: "channels/updateState",
            payload: {
              selectedRowKeys: keys
            }
          });
        }
      }
    };

    const handleDeleteItems = () => {
      dispatch({
        type: "channels/multiDelete",
        payload: {
          ids: selectedRowKeys
        }
      }).then(() => {
        handleRefresh({
          page:
            list.length === selectedRowKeys.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current
        });
      });
    };

    const handleCreateChannel = () => {
      dispatch({
        type: "channels/showModal",
        payload: {
          modalType: "create"
        }
      });
    };

    return (
      <Page inner>
        <Button
          onClick={handleCreateChannel}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Create channel
        </Button>
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: "right", fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    );
  }
}

export default Channels;
