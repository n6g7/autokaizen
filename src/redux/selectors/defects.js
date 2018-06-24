import { createSelector } from 'reselect'
import { keyComparator, objectToArray } from './base'
import { routerDefectIdSelector } from './router'

const rawDefectsSelector = state => state.defects.list
const labelFiltersSelector = state => state.tracker.filters.labels
const propsDefectIdSelector = (state, props) => props.match.params.defectId

const defectIdSelector = createSelector(
  propsDefectIdSelector,
  routerDefectIdSelector,
  (propsId, routerId) => propsId || routerId
)

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

export const defectSelector = createSelector(
  defectsSelector, defectIdSelector,
  (defects, defectId) => defects.find(d => d.id === defectId)
)
