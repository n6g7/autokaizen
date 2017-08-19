export const types = {
  CREATE_PROJECT: {
    REQUEST: 'CREATE_PROJECT.REQUEST',
    SUCCESS: 'CREATE_PROJECT.SUCCESS',
    FAILURE: 'CREATE_PROJECT.FAILURE'
  },
  SYNC_PROJECTS: 'SYNC_PROJECTS'
}

export const createProject = (boardId, name, currentSprint) => ({
  type: types.CREATE_PROJECT.REQUEST,
  boardId,
  name,
  currentSprint
})

export const createProjectSuccess = () => ({
  type: types.CREATE_PROJECT.SUCCESS
})

export const createProjectFailure = error => ({
  type: types.CREATE_PROJECT.FAILURE,
  error
})

export const syncProjects = projects => ({
  type: types.SYNC_PROJECTS,
  projects
})
