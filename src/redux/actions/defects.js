export const types = {
  SYNC_DEFECTS: 'SYNC_DEFECTS'
}

export const syncDefects = defects => ({
  type: types.SYNC_DEFECTS,
  defects
})
