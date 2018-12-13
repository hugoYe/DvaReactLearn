import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Trans, withI18n } from "@lingui/react";
import { Table, Modal } from "antd";
import { DropOption } from "components";
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
          onDeleteItem(record.channelId);
        }
      });
    }
  };

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props;

    const columns = [
      {
        title: <Trans>ChannelId</Trans>,
        dataIndex: "channelId",
        key: "channelId"
      },
      {
        title: <Trans>ChannelName</Trans>,
        dataIndex: "channelName",
        key: "channelName"
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: "createTime",
        key: "createTime"
      },
      {
        title: <Trans>UpdateTime</Trans>,
        dataIndex: "updateTime",
        key: "updateTime"
      },
      {
        title: <Trans>Operation</Trans>,
        key: "operation",
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

    return (
      <div>
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            showTotal: total => i18n.t`Total ${total} Items`
          }}
          className={styles.table}
          bordered
          // scroll={{ x: 1200 }}
          columns={columns}
          simple
          rowKey={record => record.channelId}
        />
      </div>
    );
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object
};

export default List;
