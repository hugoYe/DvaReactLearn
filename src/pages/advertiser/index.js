import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { router } from "utils";
import { connect } from "dva";
import { Row, Col, Button, Popconfirm, Select } from "antd";
import { withI18n } from "@lingui/react";
import { Page } from "components";
import { stringify } from "qs";
import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal";

@withI18n()
@connect(({ advertiser, loading }) => ({ advertiser, loading }))
class Advertiser extends PureComponent {
  render() {
    const { location, dispatch, advertiser, loading, i18n } = this.props;
    const { query, pathname } = location;
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      advertiserDict
    } = advertiser;

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
      modalType: modalType,
      item: modalType === "create" ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`advertiser/${modalType}`],
      title: `${
        modalType === "create"
          ? i18n.t`Create Advertiser`
          : i18n.t`Update Advertiser`
      }`,
      wrapClassName: "vertical-center-modal",
      onOk(data) {
        dispatch({
          type: `advertiser/${modalType}`,
          payload: data
        }).then(() => {
          handleRefresh();
        });
      },
      onCancel() {
        dispatch({
          type: "advertiser/hideModal"
        });
      }
    };

    const listProps = {
      dataSource: list,
      loading: loading.effects["advertiser/query"],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize
        });
      },
      onDeleteItem(advId) {
        dispatch({
          type: "advertiser/delete",
          payload: advId
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
          type: "advertiser/showModal",
          payload: {
            modalType: "update",
            currentItem: item
          }
        });
      }
    };

    const filterProps = {
      advertiserDict: advertiserDict,
      filter: {
        ...query
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1
        });
      },
      onAdd() {
        dispatch({
          type: "advertiser/showModal",
          payload: {
            modalType: "create"
          }
        });
      }
    };

    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    );
  }
}

Advertiser.propTypes = {
  advertiser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default Advertiser;
