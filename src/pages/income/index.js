import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
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
    const {
      currentItem,
      modalVisible,
      modalType,
      list,
      pagination,
      channelDict,
      userDict,
      userAndChannelDict
    } = income;
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
      channelDict,
      userDict,
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
          type: "income/showModal",
          payload: {
            modalType: "add"
          }
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
        handleRefresh({
          ...query,
          page: page.current,
          pageSize: page.pageSize
        });
      },
      onDeleteItem(id) {
        dispatch({
          type: "income/delete",
          payload: { id }
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
          type: "income/showModal",
          payload: {
            modalType: "update",
            currentItem: item
          }
        });
      }
    };

    const modalProps = {
      modalType: modalType,
      item: modalType === "add" ? {} : currentItem,
      channelDict,
      userDict,
      userAndChannelDict,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`income/${modalType}`],
      title: `${
        modalType === "add" ? i18n.t`Add Income` : i18n.t`Update Income`
      }`,
      wrapClassName: "vertical-center-modal",
      onOk(data) {
        dispatch({
          type: `income/${modalType}`,
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
