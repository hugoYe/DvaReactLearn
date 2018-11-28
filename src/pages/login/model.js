import { router, pathMatchRegexp } from "utils";
import { loginUser } from "api";

export default {
  namespace: "login",

  state: {
    status: undefined
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload);
      yield put({ type: "changeLoginStatus", payload: data });
      const { locationQuery } = yield select(_ => _.app);
      if (data.success) {
        const { from } = locationQuery;
        yield put({ type: "app/query" });
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
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.errorCode
      };
    }
  }
};
