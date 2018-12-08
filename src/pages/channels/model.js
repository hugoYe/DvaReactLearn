import { parse } from "qs";
import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import { pageModel } from "utils/model";
import {
  queryChannelList,
  createChannel,
  updateChannel,
  removeChannel,
  removeChannelList
} from "api";

export default modelExtend(pageModel, {
  namespace: "channels",

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/channels", location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: "query",
            payload: {
              location
            }
          });
        }
      });
    }
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(queryChannelList, payload);
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
      }
    },

    *create({ payload }, { call, put }) {
      const res = yield call(createChannel, payload);
      if (res.success) {
      } else {
        throw res;
      }
    }
  }
});
