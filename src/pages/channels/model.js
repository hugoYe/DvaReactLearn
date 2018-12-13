import { parse } from "qs";
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import { pageModel } from "utils/model";
import {
  getChannel,
  getAllChannel,
  addChannel,
  updateChannel,
  deleteChannel,
  deleteChannelBatch
} from "api";

export default modelExtend(pageModel, {
  namespace: "channels",

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: "create",
    selectedRowKeys: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/channels", location.pathname)) {
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
      const res = yield call(getAllChannel, payload);
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

    *create({ payload }, { call, put }) {
      const res = yield call(addChannel, payload);
      if (res.success) {
        yield put({ type: "hideModal" });
      } else {
        throw res;
      }
    },

    *update({ payload }, { call, put }) {
      const res = yield call(updateChannel, payload);
      if (res.success) {
        yield put({ type: "hideModal" });
      } else {
        throw res;
      }
    },

    *delete({ payload }, { call, put, select }) {
      const res = yield call(deleteChannel, payload);
      const { selectedRowKeys } = yield select(_ => _.channels);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)
          }
        });
      } else {
        throw res;
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(deleteChannelBatch, payload);
      if (data.success) {
        yield put({ type: "updateState", payload: { selectedRowKeys: [] } });
      } else {
        throw data;
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
