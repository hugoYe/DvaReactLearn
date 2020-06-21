/* global window */
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import { getOfferReportLists } from "api";
import { pageModel } from "utils/model";

export default modelExtend(pageModel, {
  namespace: "offerReport",

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/offerReport", location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: "query",
            payload
          });
        }
      });
    }
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(getOfferReportLists, payload);
      if (res.success) {
        yield put({
          type: "querySuccess",
          payload: {
            list: res.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: res.data.total
            }
          }
        });
      }
    },

    *download({ payload }, { call, put }) {
      var downloadUrl = "/api/v1/reports/exportOfferManager?";
      var addFirstJoint = false;
      var advertiser = Object.getOwnPropertyDescriptor(payload, "advertiser");
      if (advertiser.value !== undefined) {
        downloadUrl = downloadUrl + "advertiser=" + advertiser.value;
        addFirstJoint = true;
      }
      var offerId = Object.getOwnPropertyDescriptor(payload, "offerId");
      if (offerId.value !== undefined) {
        if (addFirstJoint) {
          downloadUrl = downloadUrl + "&";
          addFirstJoint = false;
        }
        downloadUrl = downloadUrl + "offerId=" + offerId.value;
        addFirstJoint = true;
      }
      var advOfferId = Object.getOwnPropertyDescriptor(payload, "advOfferId");
      if (advOfferId.value !== undefined) {
        if (addFirstJoint) {
          downloadUrl = downloadUrl + "&";
          addFirstJoint = false;
        }
        downloadUrl = downloadUrl + "advOfferId=" + advOfferId.value;
        addFirstJoint = true;
      }
      var offerName = Object.getOwnPropertyDescriptor(payload, "offerName");
      if (offerName.value !== undefined) {
        if (addFirstJoint) {
          downloadUrl = downloadUrl + "&";
          addFirstJoint = false;
        }
        downloadUrl = downloadUrl + "offerName=" + offerName.value;
        addFirstJoint = true;
      }
      var offerType = Object.getOwnPropertyDescriptor(payload, "offerType");
      if (offerType.value !== undefined) {
        if (addFirstJoint) {
          downloadUrl = downloadUrl + "&";
          addFirstJoint = false;
        }
        downloadUrl = downloadUrl + "offerType=" + offerType.value;
        addFirstJoint = true;
      }
      var country = Object.getOwnPropertyDescriptor(payload, "country");
      if (country.value !== undefined) {
        if (addFirstJoint) {
          downloadUrl = downloadUrl + "&";
          addFirstJoint = false;
        }
        downloadUrl = downloadUrl + "country=" + country.value;
        addFirstJoint = true;
      }
      var carrier = Object.getOwnPropertyDescriptor(payload, "carrier");
      if (carrier.value !== undefined) {
        if (addFirstJoint) {
          downloadUrl = downloadUrl + "&";
          addFirstJoint = false;
        }
        downloadUrl = downloadUrl + "carrier=" + carrier.value;
        addFirstJoint = true;
      }
      var status = Object.getOwnPropertyDescriptor(payload, "status");
      if (status.value !== undefined) {
        if (addFirstJoint) {
          downloadUrl = downloadUrl + "&";
          addFirstJoint = false;
        }
        downloadUrl = downloadUrl + "status=" + status.value;
        addFirstJoint = true;
      }

      window.open(downloadUrl);
    }
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    }
  }
});
