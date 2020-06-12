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
@connect(({ offerManager, loading }) => ({ offerManager, loading }))
class OfferManager extends PureComponent {
  render() {
    const { location, dispatch, offerManager, loading, i18n } = this.props;
    const { query, pathname } = location;
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      offerDict,
      advertiserDict
    } = offerManager;

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
      advertiserDict: advertiserDict,
      modalType: modalType,
      item: modalType === "create" ? {} : currentItem,
      visible: modalVisible,
      width: 800,
      maskClosable: false,
      confirmLoading: loading.effects[`offerManager/${modalType}`],
      title: `${
        modalType === "create" ? i18n.t`Create Offer` : i18n.t`Update Offer`
      }`,
      wrapClassName: "vertical-center-modal",
      onOk(data) {
        dispatch({
          type: `offerManager/${modalType}`,
          payload: data
        }).then(() => {
          handleRefresh();
        });
      },
      onCancel() {
        dispatch({
          type: "offerManager/hideModal"
        });
      }
    };

    const listProps = {
      dataSource: list,
      loading: loading.effects["offerManager/query"],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize
        });
      },
      onDeleteItem(advId) {
        dispatch({
          type: "offerManager/delete",
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
          type: "offerManager/showModal",
          payload: {
            modalType: "update",
            currentItem: item
          }
        });
      }
    };

    const filterProps = {
      advertiserDict: advertiserDict,
      offerDict: offerDict,
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
          type: "offerManager/showModal",
          payload: {
            modalType: "create"
          }
        });
      },
      onDownload(value) {
        dispatch({
          type: "offerManager/download",
          payload: {
            ...value
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

OfferManager.propTypes = {
  offerManager: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default OfferManager;
