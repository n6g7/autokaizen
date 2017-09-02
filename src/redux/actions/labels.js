export const types = {
  LOAD_BOARD_LABELS: {
    REQUEST: 'LOAD_BOARD_LABELS.REQUEST',
    SUCCESS: 'LOAD_BOARD_LABELS.SUCCESS',
    FAILURE: 'LOAD_BOARD_LABELS.FAILURE'
  },
  ADD_LABEL: {
    REQUEST: 'ADD_LABEL.REQUEST',
    SUCCESS: 'ADD_LABEL.SUCCESS',
    FAILURE: 'ADD_LABEL.FAILURE'
  },
  REMOVE_LABEL: {
    REQUEST: 'REMOVE_LABEL.REQUEST',
    SUCCESS: 'REMOVE_LABEL.SUCCESS',
    FAILURE: 'REMOVE_LABEL.FAILURE'
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

export const addLabel = (projectId, label) => ({
  type: types.ADD_LABEL.REQUEST,
  projectId,
  label
})

export const addLabelSuccess = () => ({
  type: types.ADD_LABEL.SUCCESS
})

export const addLabelFailure = error => ({
  type: types.ADD_LABEL.FAILURE,
  error
})

export const removeLabel = (projectId, labelId) => ({
  type: types.REMOVE_LABEL.REQUEST,
  projectId,
  labelId
})

export const removeLabelSuccess = () => ({
  type: types.REMOVE_LABEL.SUCCESS
})

export const removeLabelFailure = error => ({
  type: types.REMOVE_LABEL.FAILURE,
  error
})
