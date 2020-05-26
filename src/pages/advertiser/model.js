/* global window */
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import {
  queryAdvertisersList,
  createAdvertiser,
  deleteAdvertiser,
  updateAdvertiser,
  getAdvertiserDict
} from "api";
import { pageModel } from "utils/model";

export default modelExtend(pageModel, {
  namespace: "advertiser",

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: "create",
    advertiserDict: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/advertiser", location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: "query",
            payload
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
      const res = yield call(queryAdvertisersList, payload);
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

    *delete({ payload }, { call, put, select }) {
      const data = yield call(deleteAdvertiser, payload);
      if (data.success) {
      } else {
        throw data;
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createAdvertiser, payload);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
      }
    },

    *update({ payload }, { call, put }) {
      const newUser = { ...payload };
      const data = yield call(updateAdvertiser, newUser);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
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
