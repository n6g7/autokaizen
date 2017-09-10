import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import boards from './boards'
import defects from './defects'
import labels from './labels'
import projects from './projects'

export default combineReducers({
  auth,
  boards,
  defects,
  labels,
  projects,
  router: routerReducer
})
