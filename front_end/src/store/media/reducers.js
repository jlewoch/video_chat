import { createReducer } from 'redux-act';
import * as types from './actionTypes';

const initialState = {
    showVideo: true,
    localStream:{},
}

const media = createReducer({
    [types.TOGGLE_VIDEO]: (state, payload) => ({...state, showVideo: !state.showVideo}),
    [types.SET_LOCAL_STREAM]: (state, payload) => ({...state, localStream: payload}),

}, initialState)

export default media