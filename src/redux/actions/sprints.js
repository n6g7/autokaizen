export const types = {
  SYNC_SPRINTS: 'SYNC_SPRINTS'
}

export const syncSprints = sprints => ({
  type: types.SYNC_SPRINTS,
  sprints
})
