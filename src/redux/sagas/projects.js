import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
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
    const { id: hookId } = yield call(
      Trello.createWebhook,
      boardId,
      process.env.HOOK_URL
    )
    yield call(
      rsf.database.update,
      `projects/${boardId}`,
      {
        currentSprint,
        hookId,
        name
      }
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
    syncProjects,
    x => x
  )
  yield takeEvery(types.CREATE_PROJECT.REQUEST, createProjectSaga)
}
