import { call, fork, put, select, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'

import {
  setRegistrationToken
} from '@actions/notifications'

import rsf from '../rsf'

function * requestPermissionSaga () {
  const messaging = firebase.messaging()

  try {
    yield messaging.requestPermission()

    const token = yield messaging.getToken()
    yield put(setRegistrationToken(token))
  } catch (error) {
    console.warn('Notifications blocked')
  }
}

export default function * () {
  yield requestPermissionSaga()
  yield fork(rsf.messaging.syncToken, setRegistrationToken)
}
