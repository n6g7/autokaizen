export const types = {
  TOGGLE_LABEL_FILTER: 'TOGGLE_LABEL_FILTER',
}

export const toggleLabelFilter = labelId => ({
  type: types.TOGGLE_LABEL_FILTER,
  labelId,
})
