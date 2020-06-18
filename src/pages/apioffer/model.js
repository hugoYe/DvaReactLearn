/* global window */
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import { getApiOffers, getAdvertiserDict } from "api";
import { pageModel } from "utils/model";

export default modelExtend(pageModel, {
  namespace: "apiOffer",

  state: {
    list: [],
    advertiserDict: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/apiOffer", location.pathname)) {
          dispatch({
            type: "query"
          });
          dispatch({
            type: "getAdvertiserDict"
          });
        }
      });
    }
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(getApiOffers, payload);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            list: res.data
          }
        });
      }
    },

    *getAdvertiserDict({ payload }, { call, put }) {
      const res = yield call(getAdvertiserDict, payload);
      if (res.success) {
        yield put({
          type: "updateState",
          payload: {
            advertiserDict: res.data
          }
        });
      } else {
        throw res;
      }
    }
  }
});
