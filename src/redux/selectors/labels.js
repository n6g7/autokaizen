import { createSelector } from 'reselect'
import { keyComparator, objectToArray } from './base'

const rawLabelsSelector = state => state.labels.list
const rawTrelloLabelsSelector = state => state.labels.trello

export const labelsSelector = createSelector(
  rawLabelsSelector,
  labels => objectToArray(labels).sort(keyComparator(['name']))
)

export const trelloLabelsSelector = createSelector(
  rawTrelloLabelsSelector,
  labels => labels.sort(keyComparator(['color', 'name']))
)
