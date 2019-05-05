import { types } from '@actions/projects'

const initialState = {
  list: {},
  loading: false,
}

export default function projects(state = initialState, action = {}) {
  switch (action.type) {
    case types.SYNC_PROJECTS:
      return {
        ...state,
        list: action.projects,
      }
    case types.CREATE_PROJECT.REQUEST:
      return {
        ...state,
        loading: true,
      }
    case types.CREATE_PROJECT.SUCCESS:
    case types.CREATE_PROJECT.FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
