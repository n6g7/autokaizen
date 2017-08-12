import { types } from '@actions/auth'

const initialState = {
  loading: false,
  loggedIn: false,
  user: null
}

export default function auth (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN.REQUEST:
    case types.LOGOUT.REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.LOGIN.SUCCESS:
    case types.LOGIN.FAILURE:
    case types.LOGOUT.SUCCESS:
    case types.LOGOUT.FAILURE:
      return {
        ...state,
        loading: true
      }
    case types.SYNC_USER:
      return {
        ...state,
        loggedIn: !!action.user,
        user: action.user
      }
    default:
      return state
  }
}
