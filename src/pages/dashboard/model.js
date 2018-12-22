import { parse } from "qs";
import modelExtend from "dva-model-extend";
import { queryDashboard, queryWeather } from "api";
import { pathMatchRegexp } from "utils";
import { model } from "utils/model";

export default modelExtend(model, {
  namespace: "dashboard",
  state: {
    numbers: [],
    completed: [],
    user: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log(history);
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
      console.log(payload);
      const res = yield call(queryDashboard, parse(payload));
      yield put({
        type: "updateState",
        payload: res.data
      });
    }
  }
});
