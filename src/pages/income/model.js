import modelExtend from "dva-model-extend";
import { queryIncomeList } from "api";
import { pathMatchRegexp } from "utils";
import { pageModel } from "utils/model";

export default modelExtend(pageModel, {
  namespace: "income",

  state: {
    modalVisible: false
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
