import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { withI18n } from "@lingui/react";

const FormItem = Form.Item;
const Option = Select.Option;

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
class CustomerModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        custId: item.custId,
        ...getFieldsValue()
      };
      onOk(data);
    });
  };

  render() {
    const {
      modalType,
      item = {},
      onOk,
      form,
      i18n,
      ...modalProps
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem
            label={i18n.t`CustomerType`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("custType", {
              initialValue: item.custType === undefined ? "cpa" : item.custType,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select style={{ width: "50%" }}>
                <Option value="cpa">cpa</Option>
                <Option value="cpi">cpi</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label={i18n.t`CustomerName`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("custName", {
              initialValue: item.custName,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`CustomerSales`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("custSales", {
              initialValue: item.custSales,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`CustomerCompany`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("custCompany", {
              initialValue: item.custCompany,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`PostbackUrl`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("postbackUrl", {
              initialValue: item.postbackUrl,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Proportion`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("proportion", {
              initialValue: item.proportion,
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
              />
            )}
          </FormItem>
          <FormItem
            label={i18n.t`CustomerEmail`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("custEmail", {
              initialValue: item.custEmail,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input placeholder={i18n.t`CustomerEmailWarn`} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

CustomerModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default CustomerModal;
