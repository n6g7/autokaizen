import { types } from '@actions/labels'

const initialState = {
  list: {},
  loading: false,
  trello: []
}

export default function labels (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOAD_BOARD_LABELS.REQUEST:
      return {
        ...state,
        trello: initialState.trello,
        loading: true
      }
    case types.LOAD_BOARD_LABELS.SUCCESS:
      return {
        ...state,
        trello: action.labels,
        loading: false
      }
    case types.LOAD_BOARD_LABELS.FAILURE:
      return {
        ...state,
        loading: false
      }
    case types.SYNC_LABELS:
      return {
        ...state,
        list: action.labels
      }
    default:
      return state
  }
}
