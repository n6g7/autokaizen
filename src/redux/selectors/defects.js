import { createSelector } from 'reselect'
import { keyComparator, objectToArray } from './base'

const rawDefectsSelector = state => state.defects.list
const labelFiltersSelector = state => state.tracker.filters.labels

export const defectsSelector = createSelector(
  rawDefectsSelector,
  defects => objectToArray(defects).sort(keyComparator(['creation']))
)

export const filteredDefectsSelector = createSelector(
  defectsSelector, labelFiltersSelector,
  (defects, labelFilters) => labelFilters.length === 0
    ? defects
    : defects.filter(d => labelFilters.includes(d.labelId))
)
