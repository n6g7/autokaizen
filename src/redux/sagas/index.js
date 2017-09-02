import auth from './auth'
import boards from './boards'
import labels from './labels'
import projects from './projects'

export default function * rootSaga () {
  yield [
    auth(),
    boards(),
    labels(),
    projects()
  ]
}
