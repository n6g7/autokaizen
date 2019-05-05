import { fork, takeLatest } from 'redux-saga/effects'
import rsf from '../rsf'

import { types as projectTypes } from '@actions/projects'
import { syncDefects } from '@actions/defects'

function* syncDefectsSaga({ projectId }) {
  yield fork(
    rsf.database.sync,
    `defects/${projectId}`,
    {
      successActionCreator: syncDefects,
    },
    'value',
  )
}

export default function* defectsSaga() {
  yield takeLatest(projectTypes.SELECT_PROJECT, syncDefectsSaga)
}
