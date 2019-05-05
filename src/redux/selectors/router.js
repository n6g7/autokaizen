import { createSelector } from 'reselect'

const pathnameSelector = state => state.router.location.pathname

export const routerDefectIdSelector = createSelector(
  pathnameSelector,
  pathname => {
    const match = /^\/projects\/([0-9a-f]+)\/defects\/([0-9a-f]+)(\/|$)/.exec(pathname)
    return match ? match[2] : null
  },
)

export const routerProjectIdSelector = createSelector(
  pathnameSelector,
  pathname => {
    const match = /^\/projects\/([0-9a-f]+)(\/|$)/.exec(pathname)
    return match ? match[1] : null
  },
)
