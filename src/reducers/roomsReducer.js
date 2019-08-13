import { LIST_ROOMS, SAVE_USER, UPDATE_USER, ROOM_IN, LIST_ROOM_USER } from '../actions/types';

const initialState = {
  rooms: {
    list: [],
    selected: {},
    roomUsers:[]
  }
}

export default function(state = initialState, action){
  switch(action.type) {
      case LIST_ROOMS:
        const tempRooms = {... state};
        tempRooms.rooms.list = action.payload;
        console.log(tempRooms);
        return {
          ... tempRooms
        };

      case ROOM_IN:
        tempRooms = { ... state};
        tempRooms.rooms.selected = action.payload;
        return {
          ... tempRooms
        }
      case LIST_ROOM_USER:
        tempRooms = { ... state};
        tempRooms.rooms.roomUsers = action.payload;
        return {
          ... tempRooms 
        }
      default: 
        return state;

  };

}