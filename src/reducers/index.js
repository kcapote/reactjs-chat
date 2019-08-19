import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import authReducer from './authReducer';
import chatReducer from './chatReducer';

export default combineReducers({
  rooms: roomsReducer,
  authReducer,
  chatReducer
});
 

 