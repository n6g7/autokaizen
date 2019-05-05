export const types = {
  FOLLOW_BOARD: {
    REQUEST: 'FOLLOW_BOARD.REQUEST',
    SUCCESS: 'FOLLOW_BOARD.SUCCESS',
    FAILURE: 'FOLLOW_BOARD.FAILURE',
  },
  SET_REGISTRATION_TOKEN: 'SET_REGISTRATION_TOKEN',
}

export const setRegistrationToken = token => ({
  type: types.SET_REGISTRATION_TOKEN,
  token,
})

export const followBoard = boardId => ({
  type: types.FOLLOW_BOARD.REQUEST,
  boardId,
})

export const followBoardSuccess = () => ({
  type: types.FOLLOW_BOARD.SUCCESS,
})

export const followBoardFailure = () => ({
  type: types.FOLLOW_BOARD.FAILURE,
})
