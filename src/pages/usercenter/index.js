import React, { PureComponent } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { withI18n } from "@lingui/react";
import { connect } from "dva";
import { Page } from "components";

const FormItem = Form.Item;

@withI18n()
@connect(({ app, usercenter, loading }) => ({
  app,
  usercenter,
  loading
}))
class UserCenter extends PureComponent {
  render() {
    const { i18n } = this.props;
    const name = "yzn";
    const channelId = "pad20181130";
    const realName = "yezhennan";

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 }
    };

    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 4 }
    };

    return (
      <Page inner>
        <Form>
          <FormItem label="User Name: " {...formItemLayout}>
            <Input value={name} disabled="true" />
          </FormItem>
          <FormItem label="ChannelId: " {...formItemLayout}>
            <Input value={channelId} disabled="true" />
          </FormItem>
          <FormItem label="Real Name: " {...formItemLayout}>
            <Input value={realName} />
          </FormItem>
          <FormItem label="Current Password: " {...formItemLayout}>
            <Input placeholder="Please Enter Your Current Password!" />
          </FormItem>
          <FormItem label="New Password: " {...formItemLayout}>
            <Input placeholder="Please Enter Your New Password!" />
          </FormItem>
          <FormItem label="Confirm Password: " {...formItemLayout}>
            <Input placeholder="Please Enter Your Confirm Password!" />
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary">Update Information</Button>
          </FormItem>
        </Form>
      </Page>
    );
  }
}

export default UserCenter;
