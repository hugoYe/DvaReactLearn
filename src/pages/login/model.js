import { router, pathMatchRegexp } from "utils";
import { loginUser } from "api";

export default {
  namespace: "login",

  state: {
    showAlert: false
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload);
      yield put({ type: "updateState", payload: data });
      const { locationQuery } = yield select(_ => _.app);
      if (data.success) {
        const { from } = locationQuery;
        yield put({ type: "app/query", payload: data.data });
        if (!pathMatchRegexp("/login", from)) {
          if (from === "/") router.push("/dashboard");
          else router.push(from);
        } else {
          router.push("/dashboard");
        }
      }
      // else {
      //   console.log(data);
      //   throw data;
      // }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        showAlert: !payload.success,
        ...payload
      };
    }
  }
};
