import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const sagaMiddleware = createSagaMiddleware()

export default applyMiddleware(sagaMiddleware, routerMiddleware(history))
