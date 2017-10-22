import { createSelector } from 'reselect'

const pathnameSelector = state => state.router.location.pathname

export const currentProjectIdSelector = createSelector(
  pathnameSelector,
  pathname => {
    const match = /^\/projects\/([0-9a-f]+)(\/|$)/.exec(pathname)
    return match ? match[1] : null
  }
)
