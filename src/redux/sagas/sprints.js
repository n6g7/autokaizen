import { fork, takeLatest } from 'redux-saga/effects'
import rsf from '../rsf'

import { types as projectTypes } from '@actions/projects'
import { syncSprints } from '@actions/sprints'

function* syncSprintsSaga({ projectId }) {
  yield fork(
    rsf.database.sync,
    `sprints/${projectId}`,
    {
      successActionCreator: syncSprints,
    },
    'value',
  )
}

export default function* sprintsSaga() {
  yield takeLatest(projectTypes.SELECT_PROJECT, syncSprintsSaga)
}
