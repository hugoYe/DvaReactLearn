import { parse } from "qs";
import modelExtend from "dva-model-extend";
import { queryDashboard, queryWeather } from "api";
import { pathMatchRegexp } from "utils";
import { model } from "utils/model";

export default modelExtend(model, {
  namespace: "dashboard",
  state: {
    numbers: [],
    completed: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathMatchRegexp("/dashboard", pathname) ||
          pathMatchRegexp("/", pathname)
        ) {
          dispatch({ type: "query" });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryDashboard, parse(payload));
      if (res.success) {
        yield put({
          type: "updateState",
          payload: res.data
        });
      } else {
        throw res;
      }
    }
  }
});
