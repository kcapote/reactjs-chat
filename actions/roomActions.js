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


export const roomIn = (roomId, userId) => async dispatch => {

    dispatch ({
      type: LIST_ROOMS,
      payload: rooms
    }); 


  //  let ref = db.collection('users');
  //  let { docs } = await ref.where('user_id', '==', userId )
  //                          .where('roomId','==',roomId).get();   
  //                          
  //  
  //  console.log(docs);
//
  //  if( docs.length > 0 ) {
//
  //  } else {
  //    let { id } = await ref.add({
  //      roomId,
  //      name: name.trim() ,
  //      online: true
  //    });
  //    if (id){
  //      this.props.history.push(`/chat/${roomId}/${name}/${id}`);
  //      console.log('Se crea el id de usuario ' + id);
  //    }
  //  }

}  