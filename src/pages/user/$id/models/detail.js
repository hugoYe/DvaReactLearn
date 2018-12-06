import { pathMatchRegexp } from 'utils'
import { queryUser } from 'api'

export default {
  namespace: 'userDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/user/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryUser, payload)
      if (res.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: res.data,
          },
        })
      } else {
        throw res
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
