import React, { PureComponent } from "react";
import { Form, Input, Button, Select } from "antd";
import { withI18n } from "@lingui/react";
import { connect } from "dva";
import { Page } from "components";
import { router } from "utils";
import { ROLE_TYPE } from "utils/constant";

const FormItem = Form.Item;

@withI18n()
@Form.create()
@connect(({ app, loading }) => ({ app, loading }))
class UserCenter extends PureComponent {
  render() {
    const { i18n, app, form, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue, validateFields } = form;
    const { user, permissions } = app;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 }
    };

    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 4 }
    };

    const handleSubmit = e => {
      e.preventDefault();
      validateFields((err, values) => {
        const { app } = this.props;
        const { user } = app;
        const param = { userId: user.userId, ...values };
        dispatch({
          type: "usercenter/editUser",
          payload: { ...param }
        });
      });
    };

    const compareToFirstPassword = (rule, value, callback) => {
      if (value && value !== getFieldValue("newPassword")) {
        callback(i18n.t`Password Verify`);
      } else {
        callback();
      }
    };

    const validateToNextPassword = (rule, value, callback) => {
      if (value) {
        validateFields(["confirmPassword"], { force: true });
      }
      callback();
    };

    return (
      <Page inner>
        <Form onSubmit={handleSubmit}>
          <FormItem label={i18n.t`UserName` + ": "} {...formItemLayout}>
            <Input value={user.userName} disabled="true" />
          </FormItem>
          {permissions.role === ROLE_TYPE.VISITOR && (
            <FormItem label={i18n.t`ChannelId` + ": "} {...formItemLayout}>
              <Input value={user.channelId} disabled="true" />
            </FormItem>
          )}
          {/* <FormItem
            label={i18n.t`RealName` + ": "}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("realName", {
              initialValue: user.realName,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem> */}
          {/* <FormItem
            label={i18n.t`Company` + ": "}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("company", {
              initialValue: user.company,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem> */}
          <FormItem
            label={i18n.t`CurrentPassword` + ": "}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("currentPassword", {
              rules: [
                {
                  required: false
                }
              ]
            })(
              <Input
                placeholder={i18n.t`CurrentPassword Placeholder`}
                type="password"
              />
            )}
          </FormItem>
          <FormItem
            label={i18n.t`NewPassword` + ": "}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("newPassword", {
              rules: [
                {
                  required: false
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(
              <Input
                placeholder={i18n.t`NewPassword Placeholder`}
                type="password"
              />
            )}
          </FormItem>
          <FormItem
            label={i18n.t`ConfirmPassword` + ": "}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("confirmPassword", {
              rules: [
                {
                  required: false
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(
              <Input
                placeholder={i18n.t`ConfirmPassword Placeholder`}
                type="password"
              />
            )}
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              {i18n.t`Update Information`}
            </Button>
          </FormItem>
        </Form>
      </Page>
    );
  }
}

export default UserCenter;
