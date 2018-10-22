import { takeEvery, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import * as types from './actionTypes'

function * sendingMessage (e) {
  yield put(actions.addMessage({ message: e.message, name: e.name }))
  e.socket.emit('message', { message: e.message, name: e.name })
}

export const roomSagas = function * () {
  yield takeEvery(types.SEND_MESSAGE, e => sendingMessage(e.payload))
}
