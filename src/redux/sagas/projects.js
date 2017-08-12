import { takeLatest } from 'redux-saga/effects'
import rsf from '../rsf'

import { types as authTypes } from '@actions/auth'
import { syncProjects } from '@actions/projects'

export default function * projectsSaga () {
  yield takeLatest(
    authTypes.SYNC_USER,
    rsf.database.sync,
    'projects',
    syncProjects,
    x => x
  )
}
