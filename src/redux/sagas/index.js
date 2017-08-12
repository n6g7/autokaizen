import auth from './auth'
import projects from './projects'

export default function * rootSaga () {
  yield [
    auth(),
    projects()
  ]
}
