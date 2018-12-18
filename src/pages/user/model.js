/* global window */
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import {
  queryUserList,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  getChannelDict
} from "api";
import { pageModel } from "utils/model";

export default modelExtend(pageModel, {
  namespace: "user",

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: "create",
    selectedRowKeys: [],
    channelDict: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/user", location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: "query",
            payload
          });
          dispatch({ type: "getChannelDict" });
        }
      });
    }
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(queryUserList, payload);
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
      const data = yield call(removeUser, { id: payload });
      const { selectedRowKeys } = yield select(_ => _.user);
      if (data.success) {
        yield put({
          type: "updateState",
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)
          }
        });
      } else {
        throw data;
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload);
      if (data.success) {
        yield put({ type: "updateState", payload: { selectedRowKeys: [] } });
      } else {
        throw data;
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createUser, payload);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
      }
    },

    *update({ payload }, { call, put }) {
      const newUser = { ...payload };
      const data = yield call(updateUser, newUser);
      if (data.success) {
        yield put({ type: "hideModal" });
      } else {
        throw data;
      }
    },

    *getChannelDict({ payload }, { call, put }) {
      const res = yield call(getChannelDict);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            channelDict: res.data
          }
        });
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
