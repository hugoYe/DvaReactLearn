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
          if (from === "/") router.push("/dashboard");
          else router.push(from);
        } else {
          router.push("/dashboard");
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
