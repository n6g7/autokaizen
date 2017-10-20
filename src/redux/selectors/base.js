export const objectToArray = (obj, idKey = 'id') =>
  obj
    ? Object.keys(obj).map(id => ({
      [idKey]: id,
      ...obj[id]
    }))
    : []

export const keyComparator = (keys, revert = false) => {
  const aIsBigger = revert ? -1 : 1
  const bIsBigger = -aIsBigger

  const singleKeyComparator = (a, b, key) => {
    if (!b[key]) return aIsBigger
    if (!a[key]) return bIsBigger
    if (a[key] === b[key]) return 0

    return a[key] > b[key]
      ? aIsBigger
      : bIsBigger
  }

  return (a, b) => {
    for (let key of keys) {
      const result = singleKeyComparator(a, b, key)
      if (result !== 0) return result
    }

    return 0
  }
}
