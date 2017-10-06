import { call, fork, put, select, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'

import {
  followBoardSuccess,
  followBoardFailure,
  setRegistrationToken,
  types
} from '@actions/notifications'
import followBoard from '@services/follow'

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

function * followBoardSaga ({ boardId }) {
  const token = yield select(state => state.auth.messagingToken)

  try {
    yield call(followBoard, token, boardId)
    yield put(followBoardSuccess())
  } catch (error) {
    yield put(followBoardFailure())
  }
}

export default function * () {
  yield requestPermissionSaga()
  yield fork(rsf.messaging.syncToken, setRegistrationToken)

  yield takeEvery(types.FOLLOW_BOARD.REQUEST, followBoardSaga)
}
