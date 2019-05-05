import { compose, createStore } from 'redux'

import { middlewares } from './enhancers'
import { sagaMiddleware, history } from './enhancers/middlewares'
import createRootReducer from './reducers'
import rootSaga from './sagas'

const customComposer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const enhancers = customComposer(
  middlewares
)

const store = createStore(
  createRootReducer(history),
  enhancers
)

sagaMiddleware.run(rootSaga)

export default store
