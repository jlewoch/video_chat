import * as types from './actionTypes'
import { createAction } from 'redux-act'

export const toggleVideo = createAction(types.TOGGLE_VIDEO)
export const toggleAudio = createAction(types.TOGGLE_AUDIO)

export const setLocalStream = createAction(types.SET_LOCAL_STREAM)
