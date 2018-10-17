import { createReducer } from 'redux-act';
import * as types from './actionTypes';

const initialState = {
    pc:{},
    showVideo: true,
    localStream:{},
    remoteStream:null
}

const media = createReducer({
    [types.TOGGLE_VIDEO]: (state, payload) => ({...state, showVideo: !state.showVideo}),
    [types.SET_LOCAL_STREAM]: (state, payload) => ({...state, localStream: payload}),
    [types.SET_REMOTE_STREAM]: (state, payload) => ({...state, remoteStream: payload}),
    [types.SET_PC]: (state, payload)=> ({...state, pc:payload})

}, initialState)

export default media