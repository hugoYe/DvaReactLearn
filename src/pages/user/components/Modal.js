import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Radio, Modal, Cascader } from "antd";
import { Trans, withI18n } from "@lingui/react";
import city from "utils/city";

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
        ...getFieldsValue(),
        key: item.key
      };
      data.address = data.address.join(" ");
      onOk(data);
    });
  };

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("username", {
              initialValue: item.username,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`RealName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("realName", {
              initialValue: item.realName,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Company`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("company", {
              initialValue: item.company,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Address`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("address", {
              initialValue: item.address && item.address.split(" "),
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Cascader
                style={{ width: "100%" }}
                options={city}
                placeholder={i18n.t`Pick an address`}
              />
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
