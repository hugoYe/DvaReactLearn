import axios from "axios";
import { cloneDeep, isEmpty } from "lodash";
import pathToRegexp from "path-to-regexp";
import router from "umi/router";
import { message } from "antd";
import { CANCEL_REQUEST_MESSAGE } from "utils/constant";
import { getToken, clearToken } from "./token";
import qs from "qs";

const { CancelToken } = axios;
window.cancelRequest = new Map();

const codeMessage = {
  "200": "服务器成功返回请求的数据。",
  "201": "新建或修改数据成功。",
  "202": "一个请求已经进入后台排队（异步任务）。",
  "204": "删除数据成功。",
  "400": "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  "401": "用户没有权限（令牌、用户名、密码错误）。",
  "403": "用户得到授权，但是访问是被禁止的。",
  "404": "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  "406": "请求的格式不可得。",
  "410": "请求的资源被永久删除，且不会再得到的。",
  "422": "当创建一个对象时，发生一个验证错误。",
  "500": "服务器发生错误，请检查服务器。",
  "502": "网关错误。",
  "503": "服务不可用，服务器暂时过载或维护。",
  "504": "网关超时。"
};

const checkStatus = response => {
  if (response.data !== null && response.data.success) {
    return response;
  }
  const errortext = response.data.msg;
  message.error(errortext);
  const error = new Error(errortext);
  error.name = response.data.errorCode;
  error.response = response;
  throw error;
};

export default function request(options) {
  let { data, url, method = "get" } = options;
  const cloneData = cloneDeep(data);

  axios.defaults.headers.common["token"] = getToken();

  try {
    let domain = "";
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url;
  } catch (e) {
    message.error(e.message);
  }

  options.url =
    method.toLocaleLowerCase() === "get"
      ? `${url}${isEmpty(cloneData) ? "" : "?"}${qs.stringify(cloneData)}`
      : url;

  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel
    });
  });

  return (
    axios(options)
      // .then(checkStatus)
      .then(response => {
        const { status, data } = response;

        let result = {};
        if (typeof data === "object") {
          result = data;
          if (Array.isArray(data)) {
            result.list = data;
          }
        } else {
          result.data = data;
        }

        if (data.errorCode === "401") {
          clearToken();
          router.push({
            pathname: "/login",
            search: qs.stringify({
              from: window.location.pathname
            })
          });
        }

        return Promise.resolve({
          success: true,
          message: data.msg,
          statusCode: status,
          ...result
        });
      })
      .catch(error => {
        const { response, message } = error;

        if (String(message) === CANCEL_REQUEST_MESSAGE) {
          return {
            success: false
          };
        }

        let msg;
        let statusCode;

        if (response && response instanceof Object) {
          const { data, statusText } = response;
          statusCode = response.status;
          msg = data.message || statusText;
        } else {
          statusCode = 600;
          msg = error.message || "Network Error";
        }

        /* eslint-disable */
        return Promise.reject({
          success: false,
          statusCode,
          message: msg
        });
      })
  );
}
