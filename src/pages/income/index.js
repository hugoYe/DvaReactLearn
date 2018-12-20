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

const { TabPane } = Tabs;

@withI18n()
@connect(({ app, income, loading }) => ({ app, income, loading }))
class Income extends PureComponent {
  render() {
    const { app, income, loading, location, i18n } = this.props;
    const { permissions } = app;
    const { list, pagination } = income;
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
      filter: {
        ...query
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1
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

    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
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
