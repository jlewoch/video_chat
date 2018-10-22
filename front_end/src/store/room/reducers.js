import { createReducer } from 'redux-act'
import * as types from './actionTypes'
const initialState = {
  roomId: 'test',
  roomAdmin: true,
  users: {},
  messages: [],
  chatEnabled: true,
  messageInput: ''
}

const rooms = createReducer(
  {
    [types.TOGGLE_ROOM_ADMIN]: state => ({
      ...state,
      roomAdmin: !state.roomAdmin
    }),
    [types.SET_ROOM_ID]: (state, payload) => ({ ...state, roomId: payload }),
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
    [types.USER_LEFT]: (state, payload) => {},
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
