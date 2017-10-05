import { types } from '@actions/tracker'

const initialState = {
  filters: {
    labels: []
  }
}

export default function tracker (state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_LABEL_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          labels: state.filters.labels.includes(action.labelId)
            ? state.filters.labels.filter(l => l !== action.labelId)
            : state.filters.labels.concat(action.labelId)
        }
      }
    default:
      return state
  }
}
