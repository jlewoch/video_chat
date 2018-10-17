import { createReducer } from 'redux-act';
import * as types from './actionTypes';

const initialState = {
    members:{}
   
}

const rooms = createReducer({
   
}, initialState)

export default rooms
