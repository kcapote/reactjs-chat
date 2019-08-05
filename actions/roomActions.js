import { LIST_ROOMS, ROOM_IN } from './types';
import firebase from '../components/db/firestore';

const db = firebase.firestore();

export const listRooms = () => async dispatch =>  {
    
    let rooms = [];
    let ref = db.collection('rooms');
    
    try {
      let { docs } = await ref.get();
      
      rooms = docs.map( doc =>
        ({
          id: doc.id,
          ... doc.data()
        })
      );
      
    } catch(err){
      let { code, message } = err;
        const error = {
        code,
        message
      }
      rooms = error;
    } finally {
      dispatch ({
        type: LIST_ROOMS,
        payload: rooms
      }); 
    }
    
}


export const roomIn = (room) => async dispatch => {

    dispatch ({
      type: ROOM_IN,
      payload: room
    }); 
}  