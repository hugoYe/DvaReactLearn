import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import { pageModel } from "utils/model";
import { queryIncomeList, addIncome, getUserDict, getChannelDict } from "api";

export default modelExtend(pageModel, {
  namespace: "income",

  state: {
    modalVisible: false,
    channelDict: [],
    userDict: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/income", location.pathname)) {
          dispatch({
            type: "query",
            payload: {
              ...location.query
            }
          });
          dispatch({
            type: "getChannelDict"
          });
          dispatch({
            type: "getUserDict"
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryIncomeList, payload);
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
      } else {
        throw res;
      }
    },

    *add({ payload }, { call, put }) {
      const res = yield call(addIncome, payload);
      if (res.success) {
        yield put({ type: "hideModal" });
      } else {
        throw res;
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
      } else {
        throw res;
      }
    },

    *getUserDict({ payload }, { call, put }) {
      const res = yield call(getUserDict, payload);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            userDict: res.data
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
