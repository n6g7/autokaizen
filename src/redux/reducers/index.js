import { combineReducers } from 'redux'

import auth from './auth'
import projects from './projects'

export default combineReducers({
  auth,
  projects
})
