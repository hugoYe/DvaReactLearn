/* global document */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FilterItem } from "components";
import moment from "moment";
import { Trans, withI18n } from "@lingui/react";
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Checkbox
} from "antd";

const { Search } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker;

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
  handleFields = fields => {
    const { date } = fields;
    if (date.length) {
      fields.date = [
        moment(date[0]).format("YYYY-MM-DD"),
        moment(date[1]).format("YYYY-MM-DD")
      ];
    }
    return fields;
  };

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

  handleDownload = () => {
    const { onDownload, form } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    onDownload(fields);
  };

  render() {
    const { form, i18n } = this.props;
    const { getFieldDecorator } = form;
    const plainOptions = ["Date", "Country", "Carrier", "OfferID", "Cust ID"];

    let initialCreateTime = [];

    return (
      <div>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <FilterItem label="OfferId">
              {getFieldDecorator("offerId")(
                <Search onSearch={this.handleSubmit} />
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
          <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
            <FilterItem label="OfferName">
              {getFieldDecorator("offerName")(
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
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <FilterItem label={i18n.t`CustomerId`}>
              {getFieldDecorator("custId")(
                <Search onSearch={this.handleSubmit} />
              )}
            </FilterItem>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
            id="dateRangePicker"
          >
            <FilterItem label={i18n.t`Date`}>
              {getFieldDecorator("date", {
                initialValue: initialCreateTime
              })(
                <RangePicker
                  style={{ width: "100%" }}
                  onChange={this.handleChange.bind(this, "date")}
                  getCalendarContainer={() => {
                    return document.getElementById("dateRangePicker");
                  }}
                />
              )}
            </FilterItem>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 11 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            offset={0}
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
                <Button
                  type="primary"
                  icon="download"
                  onClick={this.handleDownload}
                >
                  <Trans>Download</Trans>
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 24 }} md={{ span: 8 }}>
            <FilterItem label="Group by: ">
              {getFieldDecorator("groupBy")(
                <Checkbox.Group
                  options={plainOptions}
                  defaultValue={["Date"]}
                />
              )}
            </FilterItem>
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
