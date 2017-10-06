import { types } from '@actions/auth'
import { types as notifTypes } from '@actions/notifications'

const initialState = {
  loading: false,
  loggedIn: false,
  messagingToken: null,
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
    case notifTypes.SET_REGISTRATION_TOKEN:
      return {
        ...state,
        messagingToken: action.token
      }
    default:
      return state
  }
}
