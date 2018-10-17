import { createReducer } from 'redux-act';
import * as types from './actionTypes';

const initialState = {
    members:{}
   
}

const rooms = createReducer({
    [types.ADD_NEW_MEMBER]: (state, payload) => ({...state, [payload.id]: payload.remoteStream})
}, initialState)

export default rooms