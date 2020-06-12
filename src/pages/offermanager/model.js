/* global window */
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import {
  queryOfferList,
  createOffer,
  deleteOffer,
  updateOffer,
  getOfferDict,
  getAdvertiserDict
} from "api";
import { pageModel } from "utils/model";

export default modelExtend(pageModel, {
  namespace: "offerManager",

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: "create",
    offerDict: [],
    advertiserDict: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/offermanager", location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: "query",
            payload
          });
          dispatch({
            type: "getOfferDict"
          });
          dispatch({
            type: "getAdvertiserDict"
          });
        }
      });
    }
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(queryOfferList, payload);
      if (res.success) {
        yield put({
          type: "querySuccess",
          payload: {
            list: res.data.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: res.data.total
            }
          }
        });
      }
    },

    *delete({ payload }, { call }) {
      const data = yield call(deleteOffer, payload);
      if (data.success) {
      } else {
        throw data;
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createOffer, payload);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
      }
    },

    *update({ payload }, { call, put }) {
      const newOffer = { ...payload };
      const data = yield call(updateOffer, newOffer);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
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
    },

    *getOfferDict({ payload }, { call, put }) {
      const res = yield call(getOfferDict, payload);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            OfferDict: res.data
          }
        });
      } else {
        throw res;
      }
    },

    *getAdvertiserDict({ payload }, { call, put }) {
      const res = yield call(getAdvertiserDict, payload);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            advertiserDict: res.data
          }
        });
      } else {
        throw res;
      }
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
