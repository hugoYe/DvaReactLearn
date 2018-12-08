import React, { PureComponent } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { withI18n } from "@lingui/react";
import { connect } from "dva";
import { Page } from "components";

@withI18n()
@connect(({ app, channels, loading }) => ({
  app,
  channels,
  loading
}))
class Channels extends PureComponent {
  render() {
    return (
      <Page inner>
        <div>Channels</div>
      </Page>
    );
  }
}

export default Channels;
