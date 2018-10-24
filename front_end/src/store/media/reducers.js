import { createReducer } from 'redux-act'
import * as types from './actionTypes'

const initialState = {
  shareMic: true,
  showVideo: true,
  localStream: {}
}

const media = createReducer(
  {
    [types.TOGGLE_VIDEO]: state => {
      state.localStream.getVideoTracks()[0].enabled = !state.showVideo
      return {
        ...state,
        showVideo: !state.showVideo
      }
    },
    [types.TOGGLE_AUDIO]: state => {
      state.localStream.getAudioTracks()[0].enabled = !state.shareMic
      return {
        ...state,
        shareMic: !state.shareMic
      }
    },
    [types.SET_LOCAL_STREAM]: (state, payload) => ({
      ...state,
      localStream: payload
    })
  },
  initialState
)

export default media
