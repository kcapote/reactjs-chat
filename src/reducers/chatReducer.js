import { SAVE_COMMENT, LIST_COMMENTS } from '../actions/types';

const iniatialState = {
    comments: []
};

export default (state = iniatialState, action) => {
 
   switch (action.type) {
    case SAVE_COMMENT:
      return state;

    case LIST_COMMENTS:
    console.log('action', action.payload);
      return {
        comments: action.payload
    }

    default:
      return state;  

  };


};