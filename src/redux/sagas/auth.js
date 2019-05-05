import { call, fork, put, take, takeLatest } from 'redux-saga/effects'
import rsf, { authProvider } from '../rsf'

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser,
  types,
} from '@actions/auth'
import { loadBoards } from '@actions/boards'

import Trello from '@services/trello'

function* loginSaga() {
  try {
    yield call(rsf.auth.signInWithPopup, authProvider)
    yield put(loginSuccess())
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function* logoutSaga() {
  try {
    yield call(rsf.auth.signOut)
    yield put(logoutSuccess())
  } catch (error) {
    yield put(logoutFailure(error))
  }
}

function* syncUserSaga() {
  const channel = yield call(rsf.auth.channel)

  while (true) {
    const { user } = yield take(channel)

    if (user) {
      yield call(Trello.authorize)
      yield put(syncUser(user))
      yield put(loadBoards())
    } else {
      yield put(syncUser(null))
    }
  }
}

export default function* authSaga() {
  yield takeLatest(types.LOGIN.REQUEST, loginSaga)
  yield takeLatest(types.LOGOUT.REQUEST, logoutSaga)

  yield fork(syncUserSaga)
}
