import { LIST_ROOMS, SAVE_USER, UPDATE_USER } from '../actions/types';

const initialState = {
  rooms: {
    list: [],
    selected: {}
  }
}

export default function(state = initialState, action){
  switch(action.type) {
      case LIST_ROOMS:
        const tempRooms = {... state}
        tempRooms.rooms.list = action.payload;
        console.log(tempRooms);
        return {
          ... tempRooms
        };
      
      default: 
        return state;

  };

}