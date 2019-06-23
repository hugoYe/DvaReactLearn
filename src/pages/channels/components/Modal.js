import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, Modal } from "antd";
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
class ChannelModal extends PureComponent {
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
      onOk(data);
    });
  };

  render() {
    const { type, item = {}, onOk, form, i18n, ...modalProps } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          {type !== "create" && (
            <FormItem label={i18n.t`ChannelId`} hasFeedback {...formItemLayout}>
              {getFieldDecorator("channelId", {
                initialValue: item.channelId,
                rules: [
                  {
                    required: true
                  }
                ]
              })(<Input disabled="true" />)}
            </FormItem>
          )}
          <FormItem label={i18n.t`ChannelName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("channelName", {
              initialValue: item.channelName,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ChannelModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default ChannelModal;
