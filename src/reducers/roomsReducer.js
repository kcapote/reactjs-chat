import { LIST_ROOMS, 
        //  SAVE_USER, 
        //  UPDATE_USER, 
         ROOM_IN, LIST_ROOM_USER } from '../actions/types';

const initialState = {
    list: [],
    selected: {},
    roomUsers:[]
}

export default function(state = initialState, action){
  
  switch(action.type) {
      case LIST_ROOMS:
        return {
          ...state,
          list: [...action.payload]
        };

      case ROOM_IN:
        return {
          ...state,
          selected : action.payload
        }
      case LIST_ROOM_USER:
        return {
          ...state,
          roomUsers: action.payload 
        }
      default: 
        return state;

  };

}