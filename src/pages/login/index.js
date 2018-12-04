import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Button, Row, Form, Icon, Input, Alert } from "antd";
import { GlobalFooter } from "ant-design-pro";
import { Trans, withI18n } from "@lingui/react";
import { setLocale } from "utils";
import config from "utils/config";

import styles from "./index.less";
const FormItem = Form.Item;

@withI18n()
@connect(({ login, loading }) => ({ login, loading }))
@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        errors.message = "Invalid username or password!";
        return;
      }
      dispatch({ type: "login/login", payload: values });
    });
  };

  renderMessage = content => (
    <Alert style={{ marginTop: 15 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, loading, form, i18n } = this.props;
    const { getFieldDecorator } = form;

    // deleted by hugo
    // let footerLinks = [
    //   {
    //     key: "github",
    //     title: <Icon type="github" />,
    //     href: "https://github.com/zuiidea/antd-admin",
    //     blankTarget: true
    //   }
    // ];

    // if (config.i18n) {
    //   footerLinks = footerLinks.concat(
    //     config.i18n.languages.map(item => ({
    //       key: item.key,
    //       title: (
    //         <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
    //       )
    //     }))
    //   );
    // }
    // deleted by hugo

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={<Icon type="user" className={styles.prefixIcon} />}
                  onPressEnter={this.handleOk}
                  placeholder={i18n.t`Username`}
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password!" }
                ]
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock" className={styles.prefixIcon} />}
                  onPressEnter={this.handleOk}
                  placeholder={i18n.t`Password`}
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={loading.models.login}
              >
                <Trans>Sign in</Trans>
              </Button>
              {/* <p>
                <span>
                  <Trans>Username</Trans>
                  ：guest
                </span>
                <span>
                  <Trans>Password</Trans>
                  ：guest
                </span>
              </p> */}
            </Row>
          </form>
          {!loading.effects["login/login"] &&
            login.showAlert &&
            this.renderMessage(login.msg)}
        </div>
        <div className={styles.footer}>
          {/* <GlobalFooter links={footerLinks} copyright={config.copyright} /> */}
          <GlobalFooter copyright={config.copyright} />
        </div>
      </Fragment>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default Login;
