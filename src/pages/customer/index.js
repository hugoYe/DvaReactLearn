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
@connect(({ customer, loading }) => ({ customer, loading }))
class Customer extends PureComponent {
  render() {
    const { location, dispatch, customer, loading, i18n } = this.props;
    const { query, pathname } = location;
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      customersDict
    } = customer;

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
      confirmLoading: loading.effects[`customer/${modalType}`],
      title: `${
        modalType === "create"
          ? i18n.t`Create Customer`
          : i18n.t`Update Customer`
      }`,
      wrapClassName: "vertical-center-modal",
      onOk(data) {
        dispatch({
          type: `customer/${modalType}`,
          payload: data
        }).then(() => {
          handleRefresh();
        });
      },
      onCancel() {
        dispatch({
          type: "customer/hideModal"
        });
      }
    };

    const listProps = {
      dataSource: list,
      loading: loading.effects["customer/query"],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize
        });
      },
      onDeleteItem(advId) {
        dispatch({
          type: "customer/delete",
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
          type: "customer/showModal",
          payload: {
            modalType: "update",
            currentItem: item
          }
        });
      }
    };

    const filterProps = {
      customersDict: customersDict,
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
          type: "customer/showModal",
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

Customer.propTypes = {
  customer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default Customer;
