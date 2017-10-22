import { createSelector } from 'reselect'
import { objectToArray } from './base'
import { currentProjectIdSelector } from './router'

const rawProjectsSelector = state => state.projects.list

export const projectsSelector = createSelector(
  rawProjectsSelector,
  projects => objectToArray(projects)
)

export const projectSelector = createSelector(
  projectsSelector, currentProjectIdSelector,
  (projects, projectId) => projects.find(p => p.id === projectId)
)
