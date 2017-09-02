import { call, put, select, take, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import { types as authTypes } from '@actions/auth'
import {
  loadBoardLabels,
  loadBoardLabelsSuccess,
  loadBoardLabelsFailure,
  types
} from '@actions/labels'

import Trello from '@services/trello'

const projectPathRegex = /^\/projects\/([0-9a-f]{10,})$/

function * loadBoardLabelsSaga ({ boardId }) {
  const loggedIn = yield select(state => state.auth.loggedIn)

  if (!loggedIn) {
    yield take(authTypes.SYNC_USER)
  }

  try {
    const labels = yield call(Trello.getBoardLabels, boardId)
    yield put(loadBoardLabelsSuccess(labels))
  } catch (error) {
    yield put(loadBoardLabelsFailure(error))
  }
}

export default function * boardsSaga () {
  yield takeLatest(types.LOAD_BOARD_LABELS.REQUEST, loadBoardLabelsSaga)
  yield takeLatest(
    ({ type, payload }) => type === LOCATION_CHANGE && projectPathRegex.test(payload.pathname),
    function * (action) {
      const { payload: { pathname } } = action
      const boardId = projectPathRegex.exec(pathname)[1]
      yield put(loadBoardLabels(boardId))
    }
  )
}
