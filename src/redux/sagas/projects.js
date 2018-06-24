import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import rsf from '../rsf'

import { types as authTypes } from '@actions/auth'
import {
  types,
  syncProjects,
  createProjectSuccess,
  createProjectFailure
} from '@actions/projects'

import Trello from '@services/trello'

function * createProjectSaga ({ boardId, name, currentSprint }) {
  try {
    const existingProject = yield call(rsf.database.read, `projects/${boardId}`)
    if (existingProject) throw Error('This project is already tracked.')

    const { id: hookId } = yield call(
      Trello.createWebhook,
      boardId,
      process.env.HOOK_URL
    )
    yield call(
      rsf.database.update,
      `projects/${boardId}`,
      {
        hookId,
        name
      }
    )
    yield call(
      rsf.database.update,
      `sprints/${boardId}/${currentSprint}`,
      { start: Date.now() }
    )
    yield put(createProjectSuccess())
  } catch (error) {
    yield put(createProjectFailure(error))
  }
}

export default function * projectsSaga () {
  yield takeLatest(
    authTypes.SYNC_USER,
    rsf.database.sync,
    'projects',
    {
      successActionCreator: syncProjects
    },
    'value'
  )
  yield takeEvery(types.CREATE_PROJECT.REQUEST, createProjectSaga)
}
