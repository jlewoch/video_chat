import * as types from './actionTypes'
import { createAction } from 'redux-act'

export const toggleVideo = createAction(types.TOGGLE_VIDEO)
export const setLocalStream = createAction(types.SET_LOCAL_STREAM)
export const setRemoteStream = createAction(types.SET_REMOTE_STREAM)
export const setPc = createAction(types.SET_PC)
export const setLocalDescription = createAction(types.SET_LOCAL_DESCRIPTION)
export const setRemoteDescription = createAction(types.SET_REMOTE_DESCRIPTION)


