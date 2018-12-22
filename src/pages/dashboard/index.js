import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Row, Col, Card } from "antd";
import { Color } from "utils";
import { Page, ScrollBar } from "components";
import { NumberCard, Completed } from "./components";
import styles from "./index.less";

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: "#fff"
  }
};

@connect(({ dashboard, loading }) => ({
  dashboard,
  loading
}))
class Dashboard extends PureComponent {
  render() {
    const { dashboard } = this.props;
    const { numbers, completed } = dashboard;

    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={8} md={12}>
        <NumberCard {...item} />
      </Col>
    ));

    return (
      <Page className={styles.dashboard}>
        <Row gutter={24}>
          {numberCards}
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: "24px 36px 24px 0"
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object
};

export default Dashboard;
