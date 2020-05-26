/* global window */
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import {
  queryCustomersList,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomerDict
} from "api";
import { pageModel } from "utils/model";

export default modelExtend(pageModel, {
  namespace: "customer",

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: "create",
    customersDict: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/customer", location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: "query",
            payload
          });
          dispatch({
            type: "getCustomerDict"
          });
        }
      });
    }
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(queryCustomersList, payload);
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
      const data = yield call(deleteCustomer, payload);
      if (data.success) {
      } else {
        throw data;
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createCustomer, payload);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
      }
    },

    *update({ payload }, { call, put }) {
      const newUser = { ...payload };
      const data = yield call(updateCustomer, newUser);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
      }
    },

    *getCustomerDict({ payload }, { call, put }) {
      const res = yield call(getCustomerDict, payload);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            customersDict: res.data
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
