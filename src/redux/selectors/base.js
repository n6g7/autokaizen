export const objectToArray = (obj, idKey = 'id') =>
  Object.keys(obj).map(id => ({
    [idKey]: id,
    ...obj[id]
  }))

export const keyComparator = (key, revert = false) => {
  const aIsBigger = revert ? -1 : 1
  const bIsBigger = -aIsBigger

  return (a, b) => {
    if (!b[key]) return aIsBigger
    if (!a[key]) return bIsBigger

    return revert
      ? b[key] - a[key]
      : a[key] - b[key]
  }
}
