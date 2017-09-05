import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import { types as authTypes } from '@actions/auth'
import {
  loadBoardLabels,
  loadBoardLabelsSuccess,
  loadBoardLabelsFailure,
  addLabelSuccess,
  addLabelFailure,
  removeLabelSuccess,
  removeLabelFailure,
  types
} from '@actions/labels'

import rsf from '@redux/rsf'
import Trello from '@services/trello'

const projectPathRegex = /^\/projects\/([0-9a-f]{10,})$/

const labelColours = [
  '#5368ff',
  '#e95d83',
  '#ac0ef5',
  '#42b4dd',
  '#c5b960',
  '#98c560',
  '#e95dcf',
  '#29bd96'
]

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

function * addLabelSaga ({ projectId, label }) {
  try {
    const labels = yield call(
      rsf.database.read,
      `labels/${projectId}`
    )
    const count = labels
      ? Object.keys(labels).length
      : 0

    yield call(
      rsf.database.update,
      `labels/${projectId}/${label.id}`,
      {
        colour: labelColours[count % labelColours.length],
        name: label.name
      }
    )
    yield put(addLabelSuccess())
  } catch (error) {
    yield put(addLabelFailure(error))
  }
}

function * removeLabelSaga ({ projectId, labelId }) {
  try {
    yield call(
      rsf.database.delete,
      `labels/${projectId}/${labelId}`
    )
    yield put(removeLabelSuccess())
  } catch (error) {
    yield put(removeLabelFailure(error))
  }
}

export default function * labelsSaga () {
  yield takeLatest(types.LOAD_BOARD_LABELS.REQUEST, loadBoardLabelsSaga)
  yield takeLatest(
    ({ type, payload }) => type === LOCATION_CHANGE && projectPathRegex.test(payload.pathname),
    function * (action) {
      const { payload: { pathname } } = action
      const boardId = projectPathRegex.exec(pathname)[1]
      yield put(loadBoardLabels(boardId))
    }
  )

  yield takeEvery(types.ADD_LABEL.REQUEST, addLabelSaga)
  yield takeEvery(types.REMOVE_LABEL.REQUEST, removeLabelSaga)
}
