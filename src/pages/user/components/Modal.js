import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, Modal, Select } from "antd";
import { withI18n } from "@lingui/react";

const FormItem = Form.Item;

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
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        id: item.id,
        ...getFieldsValue()
      };
      onOk(data);
    });
  };

  render() {
    const {
      channelDict,
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
          <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("userName", {
              initialValue: item.userName,
              rules: [
                {
                  required: true
                }
              ]
            })(modalType === "create" ? <Input /> : <Input disabled="true" />)}
          </FormItem>
          <FormItem label={i18n.t`RealName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("realName", {
              initialValue: item.realName,
              rules: [
                {
                  required: true
                }
              ]
            })(modalType === "create" ? <Input /> : <Input disabled="true" />)}
          </FormItem>
          <FormItem label={i18n.t`Company`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("company", {
              initialValue: item.company,
              rules: [
                {
                  required: true
                }
              ]
            })(modalType === "create" ? <Input /> : <Input disabled="true" />)}
          </FormItem>
          <FormItem label={i18n.t`ChannelName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("channelName", {
              initialValue: item.channelName,
              rules: [
                {
                  required: true,
                  message: "Please select channel!",
                  type: "array"
                }
              ]
            })(
              <Select mode="multiple" placeholder="Please select channel!">
                {channelDict}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default UserModal;
