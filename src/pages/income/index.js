import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Tabs } from "antd";
import { router } from "utils";
import { stringify } from "qs";
import { withI18n } from "@lingui/react";
import { Page } from "components";
import Filter from "./components/Filter";
import List from "./components/List";
import Modal from "./components/Modal";

@withI18n()
@connect(({ app, income, loading }) => ({ app, income, loading }))
class Income extends PureComponent {
  render() {
    const { app, income, loading, location, i18n, dispatch } = this.props;
    const { permissions } = app;
    const { modalVisible, list, pagination } = income;
    const { query, pathname } = location;

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

    const filterProps = {
      permissions,
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
          type: "income/showModal"
        });
      }
    };

    const listProps = {
      permissions,
      pagination,
      dataSource: list,
      loading: loading.effects["income/query"],
      onChange(page) {
        router.push({
          pathname,
          search: stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize
          })
        });
      }
    };

    const modalProps = {
      visible: modalVisible,
      maskClosable: false,
      title: "Add Income",
      wrapClassName: "vertical-center-modal",
      onOk(data) {
        // let channelId = [];
        // for (let i = 0; i < data.channelName.length; i++) {
        //   channelId[i] = dictMap.get(data.channelName[i]);
        // }
        // data.channelId = channelId;
        dispatch({
          type: `income/add`,
          payload: data
        }).then(() => {
          handleRefresh();
        });
      },
      onCancel() {
        dispatch({
          type: "income/hideModal"
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

Income.propTypes = {
  income: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default Income;
