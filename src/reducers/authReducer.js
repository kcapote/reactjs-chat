import { LOGIN, REGISTER, LOGOUT } from '../actions/types';

const initialState = {
  auth: {}
}

export default ( state = initialState, action) => {
    switch(action.type){
      case LOGIN: 
        return {
          ...state,
          auth: action.payload
        }
      case REGISTER:
        return {
          ...state,
          auth: action.payload
        }

      case LOGOUT:
        return {
          ...state,
          auth: action.payload
        }  

      default:
        return state;

    }
};



