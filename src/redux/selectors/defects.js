import { createSelector } from 'reselect'
import { keyComparator, objectToArray } from './base'

const rawDefectsSelector = state => state.defects.list

export const defectsSelector = createSelector(
  rawDefectsSelector,
  defects => objectToArray(defects).sort(keyComparator('creation', true))
)
