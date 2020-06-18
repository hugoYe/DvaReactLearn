import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table, Modal, Avatar, Button, Tag } from "antd";
import { DropOption } from "components";
import { Trans, withI18n } from "@lingui/react";
import Link from "umi/link";
import styles from "./List.less";

const { confirm } = Modal;

@withI18n()
class List extends PureComponent {
  handleAddToOffer = (record, e) => {
    const { onAddToOffer } = this.props;

    if (e.key === "1") {
      onAddToOffer(record);
    }
  };

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props;

    const columns = [
      {
        title: <Trans>AdvOfferId</Trans>,
        dataIndex: "advOfferId",
        width: 100,
        fixed: "left"
      },
      {
        title: <Trans>Preview</Trans>,
        dataIndex: "previewUrl",
        render: text => (
          <a href={text} target="_blank">
            {" "}
            preview
          </a>
        )
      },
      {
        title: <Trans>OfferName</Trans>,
        dataIndex: "offerName",
        width: 100
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
        title: "Daily Cap",
        dataIndex: "cap"
      },
      {
        title: "Process",
        dataIndex: "process"
      },
      {
        title: <Trans>Description</Trans>,
        dataIndex: "description"
      },
      {
        title: <Trans>Operation</Trans>,
        key: "operation",
        width: 100,
        fixed: "right",
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleAddToOffer(record, e)}
              menuOptions={[{ key: "1", name: "Add to offer" }]}
            />
          );
        }
      }
    ];

    return (
      <Table
        {...tableProps}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
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
