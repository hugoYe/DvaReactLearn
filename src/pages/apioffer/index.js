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
@connect(({ apiOffer, loading }) => ({ apiOffer, loading }))
class ApiOffer extends PureComponent {
  render() {
    const { location, dispatch, apiOffer, loading, i18n } = this.props;
    const { query, pathname } = location;
    const { list, advertiserDict } = apiOffer;

    const listProps = {
      dataSource: list,
      loading: loading.effects["offerManager/create"],
      onAddToOffer(value) {
        dispatch({
          type: `offerManager/create`,
          payload: value
        });
      }
    };

    const filterProps = {
      advertiserDict: advertiserDict,
      filter: {
        ...query
      },
      onFilterChange(value) {
        dispatch({
          type: "apiOffer/query",
          payload: value
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

ApiOffer.propTypes = {
  apiOffer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default ApiOffer;
