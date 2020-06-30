import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table, Modal, Avatar, Divider, Tag } from "antd";
import { DropOption } from "components";
import { Trans, withI18n } from "@lingui/react";
import Link from "umi/link";
import styles from "./List.less";

const { confirm } = Modal;

@withI18n()
class List extends PureComponent {
  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props;

    const columns = [
      {
        title: i18n.t`Date`,
        dataIndex: "date",
        width: 100,
        fixed: "left"
      },
      {
        title: "Gross Clicks",
        dataIndex: "grossClicks",
        width: 150
      },
      {
        title: "Unique Clicks",
        dataIndex: "uniqueClicks",
        width: 150
      },
      {
        title: "Conversions",
        dataIndex: "conversions"
      },
      {
        title: "Revenue",
        dataIndex: "revenue"
      },
      {
        title: "CR(%)",
        dataIndex: "cr"
      },
      {
        title: "ECPC",
        dataIndex: "ecpc"
      }
    ];

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.custId}
      />
    );
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object
};

export default List;
