export const types = {
  LOAD_BOARD_LABELS: {
    REQUEST: 'LOAD_BOARD_LABELS.REQUEST',
    SUCCESS: 'LOAD_BOARD_LABELS.SUCCESS',
    FAILURE: 'LOAD_BOARD_LABELS.FAILURE'
  }
}

export const loadBoardLabels = boardId => ({
  type: types.LOAD_BOARD_LABELS.REQUEST,
  boardId
})

export const loadBoardLabelsSuccess = labels => ({
  type: types.LOAD_BOARD_LABELS.SUCCESS,
  labels
})

export const loadBoardLabelsFailure = error => ({
  type: types.LOAD_BOARD_LABELS.FAILURE,
  error
})
