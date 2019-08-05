import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import authReducer from './authReducer';

export default combineReducers({
  roomsReducer,
  authReducer
});
 

 