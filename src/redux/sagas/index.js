import auth from './auth'

export default function * rootSaga () {
  yield [
    auth()
  ]
}
