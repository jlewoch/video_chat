import { createStore } from 'redux';
import reducers from './roots';

const store = createStore(reducers);
export default store;
