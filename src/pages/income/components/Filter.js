import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FilterItem } from "components";
import { Trans, withI18n } from "@lingui/react";
import {
  Form,
  Row,
  Col,
  DatePicker,
  Input,
  Button,
  Select,
  Alert,
  Upload,
  message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ROLE_TYPE } from "utils/constant";

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

  handleSubmit = () => {
    const { onFilterChange, form } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    fields = this.handleFields(fields);
    onFilterChange(fields);
  };

  handleDownload = () => {
    const { onDownload, form } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    fields = this.handleFields(fields);
    onDownload(fields);
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

  adminUi = () => {
    const {
      onFilterChange,
      onAdd,
      form,
      i18n,
      channelDict,
      userDict
    } = this.props;
    const { getFieldDecorator } = form;

    const userOptions = userDict.map(user => (
      <Option key={user.id}>{user.userId}</Option>
    ));

    const channelOptions = channelDict.map(channel => (
      <Option key={channel.channelId}>{channel.channelName}</Option>
    ));

    const uploadProps = {
      name: "file",
      action: "/api/v1/reports/upload",
      headers: {
        authorization: "authorization-text"
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} ${i18n.t`upload`}`);
          onFilterChange();
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} ${i18n.t`Upload fail`}`);
        }
      }
    };

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
            {getFieldDecorator("userIds")(
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                showSearch
                placeholder={i18n.t`Please select user`}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {userOptions}
              </Select>
            )}
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
          >
            {getFieldDecorator("channelIds")(
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                showSearch
                placeholder={i18n.t`Please select channel`}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {channelOptions}
              </Select>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            {...ColProps}
            xl={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            offset={11}
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

              <div>
                <Button type="ghost" className="margin-right" onClick={onAdd}>
                  <Trans>Add</Trans>
                </Button>
                <Upload {...uploadProps}>
                  <Button>
                    <UploadOutlined /> {i18n.t`Batch Add`}
                  </Button>
                </Upload>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  vistorUi = () => {
    const { form, channelDict, i18n } = this.props;
    const { getFieldDecorator } = form;

    const channelOptions = channelDict.map(channelId => (
      <Option key={channelId}>{channelId}</Option>
    ));

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
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 8 }} sm={{ span: 12 }}>
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
