import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './roots'
import { roomSagas } from './room/sagas'

const saga = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(saga))
saga.run(roomSagas)
export default store
