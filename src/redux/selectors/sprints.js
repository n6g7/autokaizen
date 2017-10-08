import { createSelector } from 'reselect'
import { keyComparator, objectToArray } from './base'

const rawSprintsSelector = state => state.sprints.list

export const sprintsSelector = createSelector(
  rawSprintsSelector,
  sprints => objectToArray(sprints, 'number')
    .sort(keyComparator('start'))
    .map(sprint => ({
      ...sprint,
      number: parseInt(sprint.number)
    }))
)

export const currentSprintSelector = createSelector(
  sprintsSelector,
  sprints => sprints.length > 0
    ? sprints[sprints.length - 1].number
    : NaN
)
