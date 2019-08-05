import { LIST_ROOMS, SAVE_USER, UPDATE_USER } from '../actions/types';

const initialState = {
  list: [],
  selected: {}
}

export default function(state = initialState, action){
  switch(action.type) {
      case LIST_ROOMS:
        console.log('reducer',action);
        return {
          ...state,
          list: action.payload
        };
      
      default: 
        return state;

  };

}