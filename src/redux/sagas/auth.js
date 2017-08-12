import { call, fork, put, take, takeLatest } from 'redux-saga/effects'
import rsf, { authProvider } from '../rsf'

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser,
  types
} from '@actions/auth'

function * loginSaga () {
  try {
    yield call(rsf.auth.signInWithPopup, authProvider)
    yield put(loginSuccess())
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function * logoutSaga () {
  try {
    yield call(rsf.auth.signOut)
    yield put(logoutSuccess())
  } catch (error) {
    yield put(logoutFailure(error))
  }
}

function * syncUserSaga () {
  const channel = yield call(rsf.auth.channel)

  while (true) {
    const { user } = yield take(channel)

    if (user) yield put(syncUser(user))
    else yield put(syncUser(null))
  }
}

export default function * authSaga () {
  yield takeLatest(types.LOGIN.REQUEST, loginSaga)
  yield takeLatest(types.LOGOUT.REQUEST, logoutSaga)

  yield fork(syncUserSaga)
}
