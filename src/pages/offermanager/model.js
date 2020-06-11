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
