export const types = {
  LOAD_BOARDS: {
    REQUEST: 'LOAD_BOARDS.REQUEST',
    SUCCESS: 'LOAD_BOARDS.SUCCESS',
    FAILURE: 'LOAD_BOARDS.FAILURE',
  },
}

export const loadBoards = () => ({
  type: types.LOAD_BOARDS.REQUEST,
})

export const loadBoardsSuccess = boards => ({
  type: types.LOAD_BOARDS.SUCCESS,
  boards,
})

export const loadBoardsFailure = error => ({
  type: types.LOAD_BOARDS.FAILURE,
  error,
})
