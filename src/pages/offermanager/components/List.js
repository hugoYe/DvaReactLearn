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
          onDeleteItem(record.offerId);
        }
      });
    }
  };

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props;

    const columns = [
      {
        title: "OfferId",
        dataIndex: "offerId",
        width: 100,
        fixed: "left"
      },
      {
        title: <Trans>Preview</Trans>,
        dataIndex: "previewUrl"
      },
      {
        title: <Trans>AdvOfferId</Trans>,
        dataIndex: "advOfferId",
        width: 100
      },
      {
        title: <Trans>Advertiser</Trans>,
        dataIndex: "advertiser",
        width: 100
      },
      {
        title: <Trans>OfferName</Trans>,
        dataIndex: "offerName",
        width: 100
      },
      {
        title: <Trans>AdvertiserType</Trans>,
        dataIndex: "offerType"
      },
      {
        title: <Trans>Country</Trans>,
        dataIndex: "country",
        render: country => (
          <span>
            {country != undefined &&
              country.split(";").map(c => <Tag key={c}>{c}</Tag>)}
          </span>
        )
      },
      {
        title: <Trans>Carrier</Trans>,
        dataIndex: "carrier",
        render: carrier => (
          <span>
            {carrier != undefined &&
              carrier.split(";").map(c => <Tag key={c}>{c}</Tag>)}
          </span>
        )
      },
      {
        title: "Payout IN",
        dataIndex: "payoutIn"
      },
      {
        title: "Payout OUT",
        dataIndex: "payoutOut"
      },
      {
        title: "Daily Cap",
        dataIndex: "cap"
      },
      {
        title: "Process",
        dataIndex: "process"
      },
      {
        title: "Time Zone",
        dataIndex: "timeZone"
      },
      {
        title: "Status",
        dataIndex: "status",
        render: text => {
          return text === 1 ? "on" : "off";
        }
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: "createTime"
      },
      {
        title: <Trans>UpdateTime</Trans>,
        dataIndex: "updateTime"
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
