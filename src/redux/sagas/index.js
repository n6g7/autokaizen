import { fork, put } from 'redux-saga/effects'
import { selectProject } from '@actions/projects'

import auth from './auth'
import boards from './boards'
import defects from './defects'
import labels from './labels'
import notifications from './notifications'
import projects from './projects'
import sprints from './sprints'

const projectPathRegex = /^\/projects\/([0-9a-f]{10,})$/

export default function * rootSaga () {
  yield [
    fork(auth),
    fork(boards),
    fork(defects),
    fork(labels),
    fork(notifications),
    fork(projects),
    fork(sprints)
  ]

  const match = projectPathRegex.exec(window.location.pathname)
  if (match) yield put(selectProject(match[1]))
}
