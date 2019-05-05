import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth'
import boards from './boards'
import defects from './defects'
import labels from './labels'
import projects from './projects'
import sprints from './sprints'
import tracker from './tracker'

export default (history) => combineReducers({
  auth,
  boards,
  defects,
  labels,
  projects,
  router: connectRouter(history),
  sprints,
  tracker
})
