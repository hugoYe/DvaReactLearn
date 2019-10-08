import React, { PureComponent } from "react";
import { Table, Modal, Statistic, Row, Col, Button } from "antd";
import { DropOption } from "components";
import { Trans, withI18n } from "@lingui/react";
import { Ellipsis } from "ant-design-pro";
import { ROLE_TYPE } from "utils/constant";
import styles from "./List.less";

const { confirm } = Modal;

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props;

    if (e.key === "1") {
      onEditItem(record);
    } else if (e.key === "2") {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id);
        }
      });
    }
  };

  render() {
    const { i18n, permissions, ...tableProps } = this.props;
    const adminColumns = [
      {
        title: i18n.t`Date`,
        dataIndex: "date",
        width: 100,
        fixed: "left"
      },
      {
        title: i18n.t`UserId`,
        dataIndex: "customerId",
        width: 120
      },
      // {
      //   title: i18n.t`UserName`,
      //   dataIndex: "userName"
      // },
      // {
      //   title: i18n.t`RealName`,
      //   dataIndex: "realName"
      // },
      // {
      //   title: i18n.t`ChannelId`,
      //   dataIndex: "channelId",
      //   render: text => (
      //     <Ellipsis tooltip length={30}>
      //       {text}
      //     </Ellipsis>
      //   )
      // },
      {
        title: i18n.t`ChannelName`,
        dataIndex: "channelName"
      },
      {
        title: i18n.t`PV`,
        dataIndex: "pv",
        render: text => {
          return `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: i18n.t`UV`,
        dataIndex: "uv",
        render: text => {
          return `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: i18n.t`Income`,
        dataIndex: "income",
        render: text => {
          return `$${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: i18n.t`RealIncome`,
        dataIndex: "realIncome",
        render: text => {
          return `$${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: <Trans>Operation</Trans>,
        key: "operation",
        width: 100,
        fixed: "right",
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: "1", name: i18n.t`Update` },
                { key: "2", name: i18n.t`Delete` }
              ]}
            />
          );
        }
      }
    ];

    const vistorColumns = [
      {
        title: i18n.t`Date`,
        dataIndex: "date",
        width: 100,
        fixed: "left"
      },
      {
        title: i18n.t`UserId`,
        dataIndex: "customerId",
        width: 120
      },
      {
        title: i18n.t`PV`,
        dataIndex: "pv",
        render: text => {
          return `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: i18n.t`UV`,
        dataIndex: "uv",
        render: text => {
          return `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: i18n.t`Income`,
        dataIndex: "income",
        render: text => {
          return `$${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    ];
    const columns =
      permissions.role === ROLE_TYPE.ADMIN ? adminColumns : vistorColumns;

    const footerRender = currentPageData => {
      let totalPv = 0;
      let totalUv = 0;
      let totalIncome = 0;
      let totalRealIncome = 0;

      currentPageData.map(current => {
        totalPv = totalPv + current.pv;
        totalUv = totalUv + current.uv;
        totalIncome = totalIncome + current.income;
        totalRealIncome = totalRealIncome + current.realIncome;
      });

      return (
        <Row gutter={16}>
          <Col span={3}>
            <Statistic title={i18n.t`PV`} value={totalPv} />
          </Col>
          <Col span={3}>
            <Statistic title={i18n.t`UV`} value={totalUv} />
          </Col>
          <Col span={3}>
            <Statistic
              title={i18n.t`Income`}
              value={totalIncome}
              precision={2}
            />
          </Col>
          <Col span={3}>
            <Statistic
              title={i18n.t`RealIncome`}
              value={totalRealIncome}
              precision={2}
            />
          </Col>
        </Row>
      );
    };

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`
        }}
        bordered
        scroll={{ x: 900 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
        footer={footerRender}
      />
    );
  }
}

export default List;
