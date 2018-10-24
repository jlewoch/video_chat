import * as types from './actionTypes'
import { createAction } from 'redux-act'
export const addUser = createAction(types.ADD_USER)
export const userLeft = createAction(types.USER_LEFT)
export const toggleChat = createAction(types.TOGGLE_CHAT)
export const addMessage = createAction(types.ADD_MESSAGE)
export const sendMessage = createAction(types.SEND_MESSAGE)
export const inputChange = createAction(types.INPUT_CHANGE)
export const setName = createAction(types.SET_NAME)
