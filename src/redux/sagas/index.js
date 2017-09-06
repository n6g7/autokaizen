import { fork, put } from 'redux-saga/effects'
import { selectProject } from '@actions/projects'

import auth from './auth'
import boards from './boards'
import labels from './labels'
import projects from './projects'

const projectPathRegex = /^\/projects\/([0-9a-f]{10,})$/

export default function * rootSaga () {
  yield [
    fork(auth),
    fork(boards),
    fork(labels),
    fork(projects)
  ]

  const match = projectPathRegex.exec(window.location.pathname)
  if (match) yield put(selectProject(match[1]))
}
