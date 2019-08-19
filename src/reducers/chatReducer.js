import { SAVE_COMMENT, LIST_COMMENTS } from '../actions/types';

const iniatialState = {
    comments: []
};

export default (state = iniatialState, action) => {
 
   switch (action.type) {
    case SAVE_COMMENT:
      return state;

    case LIST_COMMENTS:
      console.log('el state es ',state.comments, ' el payload es ', action.payload);
      return {
        ...state,
        comments:  [ ...state.comments, ...action.payload]
      }

    default:
      return state;  

  };


};