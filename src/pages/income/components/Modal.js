import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Form, InputNumber, Modal, Select, DatePicker } from "antd";
import { withI18n } from "@lingui/react";

const FormItem = Form.Item;
const Option = Select.Option;
const channelOptions = [];

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

@withI18n()
@Form.create()
class IncomeModal extends PureComponent {
  handleOk = () => {
    const { onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue()
      };
      data.date = moment(data.date).format("YYYY-MM-DD");

      onOk(data);
    });
  };

  render() {
    const {
      channelDict,
      userDict,
      userAndChannelDict,
      onOk,
      form,
      i18n,
      ...modalProps
    } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

    const userOptions = userDict.map(user => (
      <Option key={user.id}>{user.userName}</Option>
    ));

    function handleUserSelected(value) {
      channelOptions.length = 0;
      setFieldsValue({ channelId: [] });
      let userId = Number(value);
      let cIds = [];
      userAndChannelDict.map(uc => {
        if (uc.userId === userId) {
          cIds.push(uc.channelId);
        }
      });
      for (let i = 0; i < cIds.length; i++) {
        channelDict.map(channel => {
          if (channel.channelId === cIds[i]) {
            channelOptions.push(
              <Option key={channel.channelId}>{channel.channelName}</Option>
            );
          }
        });
      }
    }

    function handleRealIncomeChange(value) {
      let rate = getFieldValue("incomeRate");
      let res = (value * rate) / 100;
      setFieldsValue({ income: res });
    }

    function handleIncomeChange(value) {
      let real = getFieldValue("realIncome");
      let res = (value / real) * 100;
      setFieldsValue({ incomeRate: res });
    }

    function handleRateChange(value) {
      let real = getFieldValue("realIncome");
      let res = (real * value) / 100;
      setFieldsValue({ income: res });
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("userId", {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Please select user"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={handleUserSelected}
              >
                {userOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label={i18n.t`ChannelName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("channelId", {
              rules: [
                {
                  required: true,
                  message: "Please select channel"
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Please select channel"
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
          </FormItem>
          <FormItem label={i18n.t`DatePicker`} {...formItemLayout}>
            {getFieldDecorator("date", {
              rules: [
                {
                  type: "object",
                  required: true,
                  message: "Please select date"
                }
              ]
            })(
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Please select date"
              />
            )}
          </FormItem>
          <FormItem label={i18n.t`PV`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("pv", {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                placeholder="Please input pv"
                style={{ width: "100%" }}
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />
            )}
          </FormItem>
          <FormItem label={i18n.t`UV`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("uv", {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                placeholder="Please input uv"
                style={{ width: "100%" }}
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />
            )}
          </FormItem>
          <FormItem label={i18n.t`RealIncome`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("realIncome", {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                style={{ width: "100%" }}
                step={0.1}
                precision={2}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={handleRealIncomeChange}
              />
            )}
          </FormItem>
          <FormItem label={i18n.t`Income`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("income", {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                style={{ width: "100%" }}
                step={0.1}
                precision={2}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={handleIncomeChange}
              />
            )}
          </FormItem>
          <FormItem label={i18n.t`IncomeRate`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("incomeRate", {
              initialValue: 100,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                min={0}
                max={100}
                precision={2}
                formatter={value => `${value}%`}
                parser={value => value.replace("%", "")}
                onChange={handleRateChange}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

IncomeModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default IncomeModal;
