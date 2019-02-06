import { router, pathMatchRegexp } from "utils";
import modelExtend from "dva-model-extend";
import { model } from "utils/model";
import { stringify } from "qs";
import { queryUserInfo, editUser } from "api";
import { clearToken } from "../../utils/token";

export default modelExtend(model, {
  namespace: "usercenter",

  // state: {
  //   user: {}
  // },

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathMatchRegexp("/usercenter", location.pathname)) {
  //         dispatch({
  //           type: "query"
  //         });
  //       }
  //     });
  //   }
  // },

  effects: {
    // *query({ payload }, { call, select, put }) {
    //   const res = yield call(queryUserInfo, payload);

    //   if (res.success) {
    //     yield put({
    //       type: "updateState",
    //       payload: {
    //         user: res.data
    //       }
    //     });
    //   } else {
    //     throw res;
    //   }
    // },

    *editUser({ payload }, { call, select, put }) {
      const res = yield call(editUser, payload);
      if (res.success) {
        const { locationPathname } = yield select(_ => _.app);
        const needLogout = res.data;
        if (needLogout) {
          clearToken();
          router.push({
            pathname: "/login",
            search: stringify({
              from: locationPathname
            })
          });
        } else {
          yield put({ type: "app/query" });
        }
      } else {
        throw res;
      }
    }
  }
});
