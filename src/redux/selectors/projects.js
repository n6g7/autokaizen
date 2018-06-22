import { createSelector } from 'reselect'
import { objectToArray } from './base'

const rawProjectsSelector = state => state.projects.list
const projectIdSelector = (state, props) => props.match.params.id

export const projectsSelector = createSelector(
  rawProjectsSelector,
  projects => objectToArray(projects)
)

export const projectSelector = createSelector(
  projectsSelector, projectIdSelector,
  (projects, projectId) => projects.find(p => p.id === projectId)
)
