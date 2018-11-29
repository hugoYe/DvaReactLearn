import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FilterItem } from "components";
import { Trans, withI18n } from "@lingui/react";
import { Form, Row, Col, DatePicker, Input } from "antd";

const { Search } = Input;
const { RangePicker } = DatePicker;

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

  render() {
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
      </Row>
    );
  }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default Filter;
