import {combineReducers} from 'redux';
import orderReducer from './order';
import userReducer from './user';

const rootReducer = combineReducers({
  orderReducer,
  userReducer
});

export default rootReducer;