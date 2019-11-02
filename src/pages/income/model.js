import modelExtend from "dva-model-extend";
import { pathMatchRegexp } from "utils";
import { pageModel } from "utils/model";
import { ROLE_TYPE } from "utils/constant";
import {
  queryIncomeList,
  addIncome,
  deleteIncome,
  updateIncome,
  getUserDict,
  getChannelDict,
  getUserAndChannelDict,
  downloadReport
} from "api";

export default modelExtend(pageModel, {
  namespace: "income",

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: "add",
    channelDict: [],
    userDict: [],
    userAndChannelDict: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp("/income", location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: "query",
            payload
          });
          dispatch({
            type: "getChannelDict"
          });
          dispatch({
            type: "getUserDict"
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const { user, permissions } = yield select(_ => _.app);
      const vistorQuery = { userIds: [user.id], ...payload };
      const res = yield call(
        queryIncomeList,
        permissions.role === ROLE_TYPE.ADMIN ? payload : vistorQuery
      );
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
        if (permissions.role !== ROLE_TYPE.ADMIN) {
          yield put({
            type: "updateState",
            payload: {
              channelDict: user.channelId
            }
          });
        }
      } else {
        throw res;
      }
    },

    *add({ payload }, { call, put }) {
      const res = yield call(addIncome, payload);
      if (res.success) {
        yield put({ type: "hideModal" });
      } else {
        throw res;
      }
    },

    *update({ payload }, { call, put }) {
      const res = yield call(updateIncome, payload);
      if (res.success) {
        yield put({ type: "hideModal" });
      } else {
        throw res;
      }
    },

    *delete({ payload }, { call, put, select }) {
      const res = yield call(deleteIncome, payload);
      if (res.success) {
        yield put({
          type: "updateState"
        });
      } else {
        throw res;
      }
    },

    *download({ payload }, { call, put }) {
      var downloadUrl = "/api/v1/reports/exportEverydayIncome?";
      var addFirstJoint = false;
      var date = Object.getOwnPropertyDescriptor(payload, "date");
      if (date.value !== undefined && date.value.length > 0) {
        for (let [index, elem] of date.value.entries()) {
          downloadUrl = downloadUrl + "date=" + elem;
          if (index < date.value.length - 1) {
            downloadUrl = downloadUrl + "&";
          }
        }
        addFirstJoint = true;
      }
      var userIds = Object.getOwnPropertyDescriptor(payload, "userIds");
      if (userIds.value !== undefined && userIds.value.length > 0) {
        for (let [index, elem] of userIds.value.entries()) {
          if (addFirstJoint) {
            downloadUrl = downloadUrl + "&";
            addFirstJoint = false;
          }
          downloadUrl = downloadUrl + "userIds=" + elem;
          if (index < userIds.value.length - 1) {
            downloadUrl = downloadUrl + "&";
          }
        }
        addFirstJoint = true;
      }
      var channelIds = Object.getOwnPropertyDescriptor(payload, "channelIds");
      if (channelIds.value !== undefined && channelIds.value.length > 0) {
        for (let [index, elem] of channelIds.value.entries()) {
          if (addFirstJoint) {
            downloadUrl = downloadUrl + "&";
            addFirstJoint = false;
          }
          downloadUrl = downloadUrl + "channelIds=" + elem;
          if (index < channelIds.value.length - 1) {
            downloadUrl = downloadUrl + "&";
          }
        }
        addFirstJoint = true;
      }
      window.open(downloadUrl);
      // const res = yield call(downloadReport, payload);
      // if (res.success) {
      //   let req = res.data;
      //   let blobObject = new Blob([req], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      //   var filename = 'temp-' + new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + '.xlsx';

      //   // chrome `浏览器;
      //   if (typeof window.chrome !== 'undefined') {
      //       let url = window.URL.createObjectURL(blobObject);
      //       let link = document.createElement('a');

      //       link.style.display = 'none';
      //       link.href = url;
      //       link.setAttribute('download', filename);
      //       document.body.appendChild(link);
      //       link.click();
      //   } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
      //       // IE version
      //       var blob = new Blob([req], {type: 'application/force-download'});

      //       window.navigator.msSaveBlob(blob, filename);
      //   } else {
      //       // Firefox version
      //       var file = new File([req], filename, {type: 'application/force-download'});

      //       window.open(URL.createObjectURL(file));
      //   }
      // } else {
      //   throw res;
      // }
    },

    *getChannelDict({ payload }, { call, put, select }) {
      const { permissions } = yield select(_ => _.app);
      if (permissions.role === ROLE_TYPE.ADMIN) {
        const res = yield call(getChannelDict);
        if (res.success) {
          yield put({
            type: "updateState",
            payload: {
              channelDict: res.data
            }
          });
        } else {
          throw res;
        }
      }
    },

    *getUserDict({ payload }, { call, put, select }) {
      const { permissions } = yield select(_ => _.app);
      if (permissions.role === ROLE_TYPE.ADMIN) {
        const res = yield call(getUserDict, payload);
        if (res.success) {
          yield put({
            type: "updateState",
            payload: {
              userDict: res.data
            }
          });
        } else {
          throw res;
        }
      }
    },

    *getUserAndChannelDict({ payload }, { call, put, select }) {
      const { permissions } = yield select(_ => _.app);
      if (permissions.role === ROLE_TYPE.ADMIN) {
        const res = yield call(getUserAndChannelDict, payload);
        if (res.success) {
          yield put({
            type: "updateState",
            payload: {
              userAndChannelDict: res.data
            }
          });
        } else {
          throw res;
        }
      }
    }
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    }
  }
});
