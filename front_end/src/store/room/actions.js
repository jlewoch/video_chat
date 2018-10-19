import * as types from './actionTypes'
import { createAction } from 'redux-act'
export const userJoined = createAction(types.USER_JOINED)
export const userLeft = createAction(types.USER_LEFT)
export const toggleChat = createAction(types.TOGGLE_CHAT)
export const addMessage = createAction(types.ADD_MESSAGE)
export const sendMessage = createAction(types.SEND_MESSAGE)
