import { takeEvery, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import * as types from './actionTypes'

// const setDescription = (e) =>{
//   this.pc.setLocalDescription(e)
// }


// export const roomsSagas = function * () {
//     yield takeEvery(types.SET_LOCAL_DESCRIPTION, (e)=>setDescription(e))
//   }