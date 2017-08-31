import mapValues from 'lodash/mapValues'

export const getProjectLabels = state => mapValues(
  state.projects.list,
  data => data.labels
)
