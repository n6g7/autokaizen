import { types } from '@actions/sprints'

const initialState = {
  list: {},
}

export default function sprints(state = initialState, action = {}) {
  switch (action.type) {
    case types.SYNC_SPRINTS:
      return {
        ...state,
        list: action.sprints,
      }
    default:
      return state
  }
}
