export const types = {
  SYNC_PROJECTS: 'SYNC_PROJECTS'
}

export const syncProjects = projects => ({
  type: types.SYNC_PROJECTS,
  projects
})
