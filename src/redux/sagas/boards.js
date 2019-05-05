import { call, put, takeEvery } from 'redux-saga/effects'

import { loadBoardsSuccess, loadBoardsFailure, types } from '@actions/boards'

import Trello from '@services/trello'

function* loadBoardsSaga() {
  try {
    const boards = yield call(Trello.getBoards)
    yield put(
      loadBoardsSuccess(
        boards.map(board => ({
          id: board.id,
          name: board.name,
        })),
      ),
    )
  } catch (error) {
    yield put(loadBoardsFailure(error))
  }
}

export default function* boardsSaga() {
  yield takeEvery(types.LOAD_BOARDS.REQUEST, loadBoardsSaga)
}
