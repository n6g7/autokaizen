import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

export const sagaMiddleware = createSagaMiddleware()

export default applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history)
)
