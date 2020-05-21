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
class AdvertiserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        advId: item.advId,
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
            label={i18n.t`AdvertiserType`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("advType", {
              initialValue: item.advType === undefined ? "cpa" : item.advType,
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
            label={i18n.t`AdvertiserName`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("advName", {
              initialValue: item.advName,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`AdvertiserSales`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("advSales", {
              initialValue: item.advSales,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`AdvertiserCompany`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("advCompany", {
              initialValue: item.advCompany,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`AdvertiserContact`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("advContact", {
              initialValue: item.advContact,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`AdvertiserPhone`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("advPhone", {
              initialValue: item.advPhone,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`AdvertiserEmail`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("advEmail", {
              initialValue: item.advEmail,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input placeholder={i18n.t`AdvertiserEmailWarn`} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

AdvertiserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default AdvertiserModal;
