import { createSelector } from 'reselect'
import { objectToArray } from './base'
import { routerProjectIdSelector } from './router'

const rawProjectsSelector = state => state.projects.list
const propsProjectIdSelector = (state, props) => props.match.params.projectId

const projectIdSelector = createSelector(
  propsProjectIdSelector,
  routerProjectIdSelector,
  (propsId, routerId) => propsId || routerId
)

export const projectsSelector = createSelector(
  rawProjectsSelector,
  projects => objectToArray(projects)
)

export const projectSelector = createSelector(
  projectsSelector, projectIdSelector,
  (projects, projectId) => projects.find(p => p.id === projectId)
)
