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
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    fields[key] = values;
    fields = this.handleFields(fields);
    onFilterChange(fields);
  };

  render() {
    const { advertiserDict, onAdd, filter, form, i18n } = this.props;
    const { getFieldDecorator } = form;

    const advNameOptions = advertiserDict.map(item => (
      <Option key={item.advName}>{item.advName}</Option>
    ));

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <FilterItem label={i18n.t`AdvertiserId`}>
            {getFieldDecorator("advId")(
              <Search onSearch={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <FilterItem label={i18n.t`AdvertiserName`}>
            {getFieldDecorator("advName")(
              <Select style={{ width: "100%" }}>{advNameOptions}</Select>
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <FilterItem label={i18n.t`AdvertiserType`}>
            {getFieldDecorator("advType")(
              <Select style={{ width: "70%" }}>
                <Option value="cpa">cpa</Option>
                <Option value="cpi">cpi</Option>
              </Select>
            )}
          </FilterItem>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
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
              <Button onClick={this.handleReset}>
                <Trans>Reset</Trans>
              </Button>
            </div>
            <Button type="ghost" onClick={onAdd}>
              <Trans>Create</Trans>
            </Button>
          </Row>
        </Col>
      </Row>
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
