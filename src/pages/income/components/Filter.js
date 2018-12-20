import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FilterItem } from "components";
import { Trans, withI18n } from "@lingui/react";
import { Form, Row, Col, DatePicker, Input, Button, Select, Alert } from "antd";
import { ROLE_TYPE } from "utils/constant";

const { Search } = Input;
const { RangePicker } = DatePicker;
const Option = Select.Option;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16
  }
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

  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    fields[key] = values;
    fields = this.handleFields(fields);
    onFilterChange(fields);
  };

  adminUi = () => {
    const { onAdd, form, i18n } = this.props;
    const { getFieldDecorator } = form;

    let initialCreateTime = [];

    return (
      <div>
        <Row gutter={24}>
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
            xl={{ span: 6 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="User"
              defaultValue={["ppp", "zzz"]}
            />
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Channel"
              defaultValue={["pad2010", "pad2012"]}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            {...ColProps}
            xl={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
            offset={15}
          >
            <Row type="flex" align="middle" justify="space-between">
              <div>
                <Button type="primary" className="margin-right">
                  <Trans>Search</Trans>
                </Button>
                <Button>
                  <Trans>Reset</Trans>
                </Button>
              </div>
              <Button type="ghost" onClick={onAdd}>
                <Trans>Add</Trans>
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  vistorUi = () => {
    const { form, i18n } = this.props;
    const { getFieldDecorator } = form;

    let initialCreateTime = [];

    return (
      <Row gutter={24}>
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
        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Channel"
            defaultValue={["pad2010", "pad2012"]}
          />
        </Col>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button type="primary" className="margin-right">
                <Trans>Search</Trans>
              </Button>
              <Button>
                <Trans>Reset</Trans>
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    const { permissions } = this.props;
    const admin = permissions.role === ROLE_TYPE.ADMIN ? true : false;

    return (
      <div>
        {admin && this.adminUi()}
        {!admin && this.vistorUi()}
      </div>
    );
  }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default Filter;
