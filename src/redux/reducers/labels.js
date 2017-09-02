import { types } from '@actions/labels'

const initialState = {
  list: [],
  loading: false
}

export default function labels (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOAD_BOARD_LABELS.REQUEST:
      return {
        ...state,
        list: initialState.list,
        loading: true
      }
    case types.LOAD_BOARD_LABELS.SUCCESS:
      return {
        ...state,
        list: action.labels,
        loading: false
      }
    case types.LOAD_BOARD_LABELS.FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
