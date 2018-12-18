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
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props;

    const columns = [
      {
        title: <Trans>Name</Trans>,
        dataIndex: "userName",
        key: "userName",
        width: 100,
        fixed: "left",
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>
      },
      {
        title: <Trans>RealName</Trans>,
        dataIndex: "realName",
        key: "realName"
      },
      {
        title: <Trans>ChannelId</Trans>,
        dataIndex: "channelId",
        key: "channelId",
        render: channelId => (
          <span>
            {channelId.map(id => (
              <Tag key={id}>{id}</Tag>
            ))}
          </span>
        )
      },
      {
        title: <Trans>ChannelName</Trans>,
        dataIndex: "channelName",
        key: "channelName",
        render: channelName => (
          <span>
            {channelName.map(name => (
              <Tag key={name}>{name}</Tag>
            ))}
          </span>
        )
      },
      {
        title: <Trans>Company</Trans>,
        dataIndex: "company",
        key: "company"
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: "createTime",
        key: "createTime"
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
        rowKey={record => record.id}
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
