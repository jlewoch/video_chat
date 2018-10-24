import { combineReducers } from 'redux';
// Reducers
import media from './media/reducers';
import room from './room/reducers'
// import communication from './communication/reducers';
// Combine Reducers
const reducers = combineReducers({
media,
room
// communication
});
export default reducers;
