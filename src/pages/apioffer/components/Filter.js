/* global document */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FilterItem } from "components";
import { Trans, withI18n } from "@lingui/react";
import { Form, Button, Row, Col, Input, Select } from "antd";

const { Search } = Input;
const Option = Select.Option;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16
  }
};

const TwoColProps = {
  ...ColProps,
  xl: 96
};

@withI18n()
@Form.create()
class Filter extends PureComponent {
  handleSubmit = () => {
    const { onFilterChange, form } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    onFilterChange(fields);
  };

  handleReset = () => {
    const { form } = this.props;
    const { getFieldsValue, setFieldsValue } = form;

    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields);
    this.handleSubmit();
  };

  render() {
    const { advertiserDict, form, i18n } = this.props;
    const { getFieldDecorator } = form;

    const advOptions = advertiserDict.map(item => (
      <Option key={item.advId}>{item.advName + item.advId}</Option>
    ));

    return (
      <div>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <FilterItem label={i18n.t`Advertiser`}>
              {getFieldDecorator("advertiser")(
                <Select style={{ width: "100%" }}>{advOptions}</Select>
              )}
            </FilterItem>
          </Col>
          <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
            <FilterItem label={i18n.t`AdvOfferId`}>
              {getFieldDecorator("advOfferId")(
                <Search onSearch={this.handleSubmit} />
              )}
            </FilterItem>
          </Col>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <FilterItem label={i18n.t`Country`}>
              {getFieldDecorator("country")(
                <Search onSearch={this.handleSubmit} />
              )}
            </FilterItem>
          </Col>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <FilterItem label={i18n.t`Carrier`}>
              {getFieldDecorator("carrier")(
                <Search onSearch={this.handleSubmit} />
              )}
            </FilterItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            {...ColProps}
            xl={{ span: 11 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            offset={15}
          >
            <Row type="flex" align="middle" justify="space-between">
              <div>
                <Button
                  type="primary"
                  className="margin-right"
                  onClick={this.handleSubmit}
                >
                  <Trans>Search</Trans>
                </Button>
                <Button className="margin-right" onClick={this.handleReset}>
                  <Trans>Reset</Trans>
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default Filter;
