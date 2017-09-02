import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import boards from './boards'
import projects from './projects'

export default combineReducers({
  auth,
  boards,
  projects,
  router: routerReducer
})
