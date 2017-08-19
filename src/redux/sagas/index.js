import auth from './auth'
import boards from './boards'
import projects from './projects'

export default function * rootSaga () {
  yield [
    auth(),
    boards(),
    projects()
  ]
}
