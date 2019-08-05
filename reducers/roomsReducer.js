import { LIST_ROOMS, SAVE_USER, UPDATE_USER, ROOM_IN } from '../actions/types';

const initialState = {
  rooms: {
    list: [],
    selected: {}
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
        const tempRooms = { ... state};
        tempRooms.rooms.selected = action.payload;
        return {
          ... tempRooms
        }
      
      default: 
        return state;

  };

}