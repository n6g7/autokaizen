import { types } from '@actions/projects'

const initialState = {
  list: {}
}

export default function projects (state = initialState, action = {}) {
  switch (action.type) {
    case types.SYNC_PROJECTS:
      return {
        ...state,
        list: action.projects
      }
    default:
      return state
  }
}
