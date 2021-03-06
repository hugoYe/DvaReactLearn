/* global window */

import { router } from "utils";
import { stringify } from "qs";
import store from "store";
import { ROLE_TYPE } from "utils/constant";
import { queryLayout, pathMatchRegexp } from "utils";
import { CANCEL_REQUEST_MESSAGE } from "utils/constant";
import { queryRouteList, logoutUser, queryUserInfo } from "api";
import config from "config";
import { clearToken } from "utils/token";

export default {
  namespace: "app",

  state: {
    user: {},
    permissions: {
      visit: []
    },
    routeList: [
      {
        id: "1",
        icon: "laptop",
        name: "Dashboard",
        zhName: "仪表盘",
        router: "/dashboard"
      }
    ],
    locationPathname: "",
    locationQuery: {},
    theme: store.get("theme") || "light",
    collapsed: store.get("collapsed") || false
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "query" });
    },

    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: "updateState",
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query
          }
        });
      });
    }

    // setupRequestCancel({ history }) {
    //   history.listen(() => {
    //     const { cancelRequest = new Map() } = window;

    //     cancelRequest.forEach((value, key) => {
    //       if (value.pathname !== window.location.pathname) {
    //         value.cancel(CANCEL_REQUEST_MESSAGE);
    //         cancelRequest.delete(key);
    //       }
    //     });
    //   });
    // },
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const res = yield call(queryUserInfo, payload);
      const user = res.data;
      const { locationPathname } = yield select(_ => _.app);

      if (res.success && user) {
        const routeRes = yield call(queryRouteList);
        let list = routeRes.data;
        const { permissions } = user;
        let routeList = list;
        if (
          permissions.role === ROLE_TYPE.ADMIN ||
          permissions.role === ROLE_TYPE.DEVELOPER
        ) {
          permissions.visit = list.map(item => item.id);
        } else {
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === "-1"
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true
            ];
            return cases.every(_ => _);
          });
        }
        yield put({
          type: "updateState",
          payload: {
            user,
            permissions,
            routeList
          }
        });
        if (
          pathMatchRegexp("/login", window.location.pathname) ||
          pathMatchRegexp("/", window.location.pathname)
        ) {
          var fdStart = user.userId.indexOf("wy");
          if (fdStart == 0) {
            router.push({
              pathname: "/dashboard"
            });
          } else {
            router.push({
              pathname: "/advertiser"
            });
          }
        }
      } else if (queryLayout(config.layouts, locationPathname) !== "public") {
        router.push({
          pathname: "/login",
          search: stringify({
            from: locationPathname
          })
        });
      }
    },

    *signOut({ payload }, { call, put, select }) {
      const data = yield call(logoutUser);
      const { locationPathname } = yield select(_ => _.app);
      if (data.success) {
        clearToken();
        yield put({
          type: "updateState",
          payload: {
            user: {},
            permissions: { visit: [] },
            menu: [
              {
                id: "1",
                icon: "laptop",
                name: "Dashboard",
                zhName: "仪表盘",
                router: "/dashboard"
              }
            ]
          }
        });
        router.push({
          pathname: "/login",
          search: stringify({
            from: locationPathname
          })
        });
      } else {
        throw data;
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },

    handleThemeChange(state, { payload }) {
      store.set("theme", payload);
      state.theme = payload;
    },

    handleCollapseChange(state, { payload }) {
      store.set("collapsed", payload);
      state.collapsed = payload;
    }
  }
};
