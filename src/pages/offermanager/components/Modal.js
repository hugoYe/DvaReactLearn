import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Modal, Select, Radio } from "antd";
import { withI18n } from "@lingui/react";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
const countryData = [
  "ge-Abkhazia",
  "af-Afghanistan",
  "al-Albania",
  "dz-Algeria"
];
const CarrierData = {
  "ge-Abkhazia": ["28968-A-Mobile", "28988-A-Mobile", "28967-28967"],
  "af-Afghanistan": [
    "41288-Afghan Telecom Corp. (AT)",
    "41280-Afghan Telecom Corp. (AT)",
    "41201-Afghan Wireless/AWCC",
    "41240-Areeba/MTN"
  ],
  "al-Albania": ["27601-AMC/Cosmote", "27603-Eagle Mobile"],
  "dz-Algeria": ["60301-ATM Mobils"]
};

@withI18n()
@Form.create()
class OfferManagerModal extends PureComponent {
  state = {
    carrier: []
  };

  handleOk = () => {
    const { item = {}, onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue()
      };
      data.offerId = item.offerId;
      data.status = item.status;
      let countryList = Array.from(data.country);
      let carrierList = Array.from(data.carrier);
      data.country = "";
      for (let i = 0; i < countryList.length; i++) {
        data.country = data.country + countryList[i];
        if (i < countryList.length - 1) {
          data.country = data.country + ";";
        }
      }
      data.carrier = "";
      for (let i = 0; i < carrierList.length; i++) {
        data.carrier = data.carrier + carrierList[i];
        if (i < carrierList.length - 1) {
          data.carrier = data.carrier + ";";
        }
      }

      onOk(data);
    });
  };

  handleAdvertiserSelected = value => {
    const { advertiserDict, form } = this.props;
    const { setFieldsValue } = form;

    advertiserDict.map(advtiser => {
      if (advtiser.advId === value) {
        setFieldsValue({ offerType: advtiser.advType });
      }
    });
  };

  handleCountrySelected = value => {
    const { form } = this.props;
    const { setFieldsValue } = form;

    var carrierList = [];
    let countryList = Array.from(value);
    countryList.map(v => (carrierList = [...carrierList, ...CarrierData[v]]));
    this.setState({
      carrier: carrierList
    });
    setFieldsValue({ carrier: [] });
  };

  render() {
    const {
      advertiserDict,
      modalType,
      item = {},
      onOk,
      form,
      i18n,
      ...modalProps
    } = this.props;
    const { carrier } = this.state;
    const { getFieldDecorator, setFieldsValue } = form;

    const advOptions = advertiserDict.map(item => (
      <Option key={item.advId}>{item.advName + item.advId}</Option>
    ));

    const countryList =
      item.country != undefined ? item.country.split(";") : [];
    const carrierList =
      item.carrier != undefined ? item.carrier.split(";") : [];

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Advertiser`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("advertiser", {
              initialValue: item.advertiser,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select
                style={{ width: "100%" }}
                onChange={this.handleAdvertiserSelected}
              >
                {advOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={i18n.t`AdvertiserType`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator("offerType", { initialValue: item.offerType })(
              <Select style={{ width: "50%" }} disabled></Select>
            )}
          </FormItem>
          <FormItem label={i18n.t`AdvOfferId`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("advOfferId", {
              initialValue: item.advOfferId,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`OfferName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("offerName", {
              initialValue: item.offerName,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Category`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("category", {
              initialValue: item.category === undefined ? 1 : item.category,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Radio.Group>
                <Radio value={1}>{i18n.t`Adult`}</Radio>
                <Radio value={2}>{i18n.t`NonAdult`}</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label={i18n.t`Country`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("country", {
              initialValue: countryList
            })(
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                onChange={this.handleCountrySelected}
              >
                {countryData.map(item => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label={i18n.t`Carrier`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("carrier", {
              initialValue: carrierList
            })(
              <Select mode="multiple" style={{ width: "100%" }}>
                {carrier.map(carrier => (
                  <Option key={carrier}>{carrier}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label={"Offer URL"} hasFeedback {...formItemLayout}>
            {getFieldDecorator("offerUrl", {
              initialValue: item.offerUrl,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={"Preview URL"} hasFeedback {...formItemLayout}>
            {getFieldDecorator("previewUrl", {
              initialValue: item.previewUrl,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Currency`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("currencyUnit", {
              initialValue:
                item.currencyUnit === undefined ? "dollar" : item.currencyUnit,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select style={{ width: "50%" }}>
                <Option value="dollar">{i18n.t`Dollar`}</Option>
                <Option value="euro">{i18n.t`Euro`}</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label={"Payout IN"} hasFeedback {...formItemLayout}>
            {getFieldDecorator("payoutIn", {
              initialValue: item.payoutIn,
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber min={0} precision={2} />)}
          </FormItem>
          <FormItem label={"Payout OUT"} hasFeedback {...formItemLayout}>
            {getFieldDecorator("payoutOut", {
              initialValue: item.payoutOut,
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber min={0} precision={2} />)}
          </FormItem>
          <FormItem label={i18n.t`Proportion`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("proportion", {
              initialValue: item.proportion,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <InputNumber
                min={0}
                max={100}
                precision={2}
                formatter={value => `${value}%`}
                parser={value => value.replace("%", "")}
              />
            )}
          </FormItem>
          <FormItem label={"Process"} hasFeedback {...formItemLayout}>
            {getFieldDecorator("process", {
              initialValue:
                item.process === undefined ? "1click" : item.process,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Radio.Group>
                <Radio value={"1click"}>{"1click"}</Radio>
                <Radio value={"2click"}>{"2click"}</Radio>
                <Radio value={"pin"}>{"pin"}</Radio>
                <Radio value={"sms"}>{"sms"}</Radio>
                <Radio value={"captcha"}>{"captcha"}</Radio>
                <Radio value={"1click+pin"}>{"1click+pin"}</Radio>
                <Radio value={"1click+captcha"}>{"1click+captcha"}</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label={"Daily Cap"} hasFeedback {...formItemLayout}>
            {getFieldDecorator("cap", {
              initialValue: item.cap,
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem label={"Time Zone"} hasFeedback {...formItemLayout}>
            {getFieldDecorator("timeZone", {
              initialValue: item.timeZone,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select style={{ width: "50%" }}>
                <Option value="GMT-12">{"GMT-12"}</Option>
                <Option value="GMT-11">{"GMT-11"}</Option>
                <Option value="GMT-10">{"GMT-10"}</Option>
                <Option value="GMT-9">{"GMT-9"}</Option>
                <Option value="GMT-8">{"GMT-8"}</Option>
                <Option value="GMT-7">{"GMT-7"}</Option>
                <Option value="GMT-6">{"GMT-6"}</Option>
                <Option value="GMT-5">{"GMT-5"}</Option>
                <Option value="GMT-4">{"GMT-4"}</Option>
                <Option value="GMT-3">{"GMT-3"}</Option>
                <Option value="GMT-2">{"GMT-2"}</Option>
                <Option value="GMT-1">{"GMT-1"}</Option>
                <Option value="GMT+0">{"GMT+0"}</Option>
                <Option value="GMT+1">{"GMT+1"}</Option>
                <Option value="GMT+2">{"GMT+2"}</Option>
                <Option value="GMT+3">{"GMT+3"}</Option>
                <Option value="GMT+4">{"GMT+4"}</Option>
                <Option value="GMT+5">{"GMT+5"}</Option>
                <Option value="GMT+6">{"GMT+6"}</Option>
                <Option value="GMT+7">{"GMT+7"}</Option>
                <Option value="GMT+8">{"GMT+8"}</Option>
                <Option value="GMT+9">{"GMT+9"}</Option>
                <Option value="GMT+10">{"GMT+10"}</Option>
                <Option value="GMT+11">{"GMT+11"}</Option>
                <Option value="GMT+12">{"GMT+12"}</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label={i18n.t`PostbackUrl`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("postbackUrl", {
              initialValue: item.postbackUrl,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Description`} hasFeedback {...formItemLayout}>
            {getFieldDecorator("description", {
              initialValue: item.description
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

OfferManagerModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default OfferManagerModal;
