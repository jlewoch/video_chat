import { createReducer } from 'redux-act'
import * as types from './actionTypes'
const initialState = {
  users: {},
  messages: [],
  chatEnabled: true
}

const rooms = createReducer(
  {
    [types.TOGGLE_CHAT]: state => ({
      ...state,
      chatEnabled: !state.chatEnabled
    }),
    [types.USER_JOINED]: (state, payload) => ({
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
          type: state.users[payload.id] ? 'recieved' : 'sent'
        }
      ]
    })
  },
  initialState
)

export default rooms
