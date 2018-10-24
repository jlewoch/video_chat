import { createReducer } from 'redux-act'
import * as types from './actionTypes'
const initialState = {
  name: '',
  users: {},
  messages: [],
  chatEnabled: true,
  messageInput: ''
}

const rooms = createReducer(
  {
    [types.TOGGLE_CHAT]: state => ({
      ...state,
      chatEnabled: !state.chatEnabled
    }),
    [types.ADD_USER]: (state, payload) => ({
      ...state,
      users: {
        ...state.users,
        [payload.id]: { name: payload.name, id: payload.id }
      }
    }),
    [types.SET_NAME]: (state, payload) => ({ ...state, name: payload }),
    [types.USER_LEFT]: (state, payload) => {
      state.users[payload].delete()
      return { ...state }
    },
    [types.ADD_MESSAGE]: (state, payload) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          name: payload.name,
          message: payload.message,
          time: new Date(),
          type: payload.id ? 'received' : 'sent'
        }
      ],
      messageInput: payload.id ? state.messageInput : ''
    }),
    [types.INPUT_CHANGE]: (state, payload) => ({
      ...state,
      messageInput: payload
    })
  },
  initialState
)

export default rooms
