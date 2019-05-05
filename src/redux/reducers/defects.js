import { types } from '@actions/defects'

const initialState = {
  list: {},
}

export default function defects(state = initialState, action = {}) {
  switch (action.type) {
    case types.SYNC_DEFECTS:
      return {
        ...state,
        list: action.defects,
      }
    default:
      return state
  }
}
