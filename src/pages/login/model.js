import { router, pathMatchRegexp } from "utils";
import { setToken } from "utils/token";
import { loginUser } from "api";

export default {
  namespace: "login",

  state: {
    showAlert: false
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      const response = yield call(loginUser, payload);
      yield put({ type: "updateState", payload: response });
      const { locationQuery } = yield select(_ => _.app);
      if (response.success) {
        const { from } = locationQuery;
        yield put({ type: "app/query" });
        if (!pathMatchRegexp("/login", from)) {
          if (from === "/") {
            var data = response.data;
            var fdStart = data.account.indexOf("wy");
            if (fdStart == 0) {
              router.push("/dashboard");
            } else {
              router.push("/advertiser");
            }
          } else {
            router.push(from);
          }
        } else {
          var data = response.data;
          var fdStart = data.account.indexOf("wy");
          if (fdStart == 0) {
            router.push("/dashboard");
          } else {
            router.push("/advertiser");
          }
        }
      } else {
        throw response;
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      if (payload.data !== null) {
        setToken(payload.data.token);
      }
      return {
        ...state,
        showAlert: !payload.success,
        ...payload
      };
    }
  }
};
