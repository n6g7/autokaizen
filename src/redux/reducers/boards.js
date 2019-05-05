import { types } from '@actions/boards'

const initialState = {
  list: [],
  loading: false,
}

export default function boards(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOAD_BOARDS.REQUEST:
      return {
        ...state,
        loading: true,
      }
    case types.LOAD_BOARDS.SUCCESS:
      return {
        ...state,
        list: action.boards,
        loading: false,
      }
    case types.LOAD_BOARDS.FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
