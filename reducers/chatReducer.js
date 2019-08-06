import { SAVE_COMMENT, LIST_COMMENTS } from '../actions/types';

const iniatialState = {
    comments: []
};

export default (state = iniatialState, action) => {
  switch (action.type) {
    case LIST_COMMENTS:
    return state;

    case SAVE_COMMENT:
      return state;

    case LIST_COMMENTS:
      return {
        comments
      }

    default:
      return state;  

  };


};