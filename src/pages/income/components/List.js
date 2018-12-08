import React, { PureComponent } from "react";
import { Table, Avatar } from "antd";
import { withI18n } from "@lingui/react";
import { Ellipsis } from "ant-design-pro";
import styles from "./List.less";

@withI18n()
class List extends PureComponent {
  render() {
    const { i18n, ...tableProps } = this.props;
    const columns = [
      {
        title: i18n.t`Date`,
        dataIndex: "date",
        width: 100,
        fixed: "left"
      },
      {
        title: i18n.t`ChannelId`,
        dataIndex: "channelId",
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        )
      },
      {
        title: i18n.t`ChannelName`,
        dataIndex: "channelName"
      },
      {
        title: i18n.t`PV`,
        dataIndex: "pv"
      },
      {
        title: i18n.t`UV`,
        dataIndex: "uv"
      },
      {
        title: i18n.t`Income`,
        dataIndex: "income",
        width: 100,
        fixed: "right"
      }
      // {
      //   title: i18n.t`Comments`,
      //   dataIndex: "comments"
      // },
      // {
      //   title: i18n.t`Views`,
      //   dataIndex: "views"
      // },
      // {
      //   title: i18n.t`Publish Date`,
      //   dataIndex: "date"
      // }
    ];

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    );
  }
}

export default List;