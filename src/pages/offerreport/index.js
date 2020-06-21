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

@withI18n()
@connect(({ offerReport, loading }) => ({ offerReport, loading }))
class OfferReport extends PureComponent {
  render() {
    const { location, dispatch, offerReport, loading, i18n } = this.props;
    const { query, pathname } = location;
    const { list, pagination } = offerReport;

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

    const listProps = {
      dataSource: list,
      loading: loading.effects["offerReport/query"],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize
        });
      }
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
      },
      onDownload(value) {
        dispatch({
          type: "offerReport/download",
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
      </Page>
    );
  }
}

OfferReport.propTypes = {
  offerReport: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default OfferReport;
