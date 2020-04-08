import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Form, Input, InputNumber, Modal, Select, DatePicker } from "antd";
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
    const { item = {}, onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue()
      };
      data.date = moment(data.date).format("YYYY-MM-DD HH:mm:ss");
      data.id = item.id;
      onOk(data);
    });
  };

  render() {
    const {
      channelDict,
      userDict,
      userAndChannelDict,
      onOk,
      item = {},
      modalType,
      form,
      i18n,
      ...modalProps
    } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

    const userOptions = userDict.map(user => (
      <Option key={user.userId}>{user.userId}</Option>
    ));

    function handleUserSelected(value) {
      userDict.map(user => {
        if (user.userId === value) {
          setFieldsValue({ incomeRate: user.incomeRate });
        }
      });

      let realIncome = getFieldValue("realIncome");
      if (realIncome > 0) {
        let rate = getFieldValue("incomeRate");
        let res = (realIncome * rate) / 100;
        setFieldsValue({ income: res });
      }

      // channelOptions.length = 0;
      // setFieldsValue({ channelId: [] });
      // let cIds = [];
      // userAndChannelDict.map(uc => {
      //   if (uc.userId === userId) {
      //     cIds.push(uc.channelId);
      //   }
      // });
      // for (let i = 0; i < cIds.length; i++) {
      //   channelDict.map(channel => {
      //     if (channel.channelId === cIds[i]) {
      //       channelOptions.push(
      //         <Option key={channel.channelId}>{channel.channelName}</Option>
      //       );
      //     }
      //   });
      // }
    }

    function handleRealIncomeChange(value) {
      let rate = getFieldValue("incomeRate");
      let res = (value * rate) / 100;
      setFieldsValue({ income: res });
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`UserId`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("userId", {
              initialValue:
                modalType === "update" ? item.customerId : undefined,
              rules: [
                {
                  required: true,
                  message: i18n.t`Please select user`
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={i18n.t`Please select user`}
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
          {/* <FormItem label={i18n.t`ChannelName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("channelId", {
              rules: [
                {
                  required: true,
                  message: i18n.t`Please select channel`
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: "100%" }}
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
          </FormItem> */}
          <FormItem label={i18n.t`DatePicker`} {...formItemLayout}>
            {getFieldDecorator("date", {
              initialValue:
                modalType === "update"
                  ? moment(item.date, "YYYY-MM-DD")
                  : undefined,
              rules: [
                {
                  type: "object",
                  required: true,
                  message: i18n.t`Please select date`
                }
              ]
            })(
              <DatePicker
                style={{ width: "100%" }}
                placeholder={i18n.t`Please select date`}
              />
            )}
          </FormItem>
          <FormItem label={i18n.t`PV`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("pv", {
              initialValue: modalType === "update" ? item.pv : undefined,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                placeholder={i18n.t`Please input pv`}
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
              initialValue: modalType === "update" ? item.uv : undefined,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                placeholder={i18n.t`Please input uv`}
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
              initialValue:
                modalType === "update" ? item.realIncome : undefined,
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
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={handleRealIncomeChange}
              />
            )}
          </FormItem>
          <FormItem label={i18n.t`Income`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("income", {
              initialValue: modalType === "update" ? item.income : undefined,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input disabled="true" />)}
          </FormItem>
          <FormItem label={i18n.t`IncomeRate`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("incomeRate", {
              initialValue:
                modalType === "update" ? item.incomeRate : undefined,
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
                disabled="true"
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
