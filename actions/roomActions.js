import { LIST_ROOMS, ROOM_IN } from './types';
import firebase from '../components/db/firestore';

const db = firebase.firestore();

export const listRooms = () => async dispatch =>  {
    
    let rooms = [];
    let ref = db.collection('rooms');
    
    try {
      rooms = await ref.get().docs.map( doc =>
        ({
          id: doc.id,
          ... doc.data()
        })
      );
      console.log('try',rooms);
      
    } catch(err){
      let { code, message } = err;
        const error = {
        code,
        message
      }
      rooms = error;
    } finally {
      console.log('action', rooms);
      dispatch ({
        type: ROOM_IN,
        payload: rooms
      }); 
    }

    //ref.orderBy('name','asc').onSnapshot( res => {
    //  console.log(res);
    //  rooms = res.docs.map(room => {
    //    return {
    //      id: room.id,
    //      ...room.data()
    //    }
    //  });
    //  dispatch ({
    //    type: LIST_ROOMS,
    //    payload: rooms
    //  });    
    //}, error => {
    //  console.log(error);
    //});
    
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