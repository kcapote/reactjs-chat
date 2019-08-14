import { LIST_ROOMS, ROOM_IN, LIST_ROOM_USER } from './types';
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
          ...doc.data()
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


export const roomIn = (room ,userId) => async dispatch => {
    const refRoom = db.collection('rooms').doc(room.id);
    const refUser = db.collection('users').doc(userId);
    const refRoomUser = db.collection('roomUser');

    try { 
      const resp = await refRoomUser                
                .where('roomId','==',refRoom)
                .where('userId','==',refUser).get();
                
      if(resp.empty){
          await refRoomUser.add({
          roomId: refRoom,
          userId: refUser,
          online: true
        });
      }        

    } catch(err){
        console.log(err);
    } finally{
      dispatch ({
        type: ROOM_IN,
        payload: room
      }); 
    }           

}


export const getUsersRoom = (room) => async dispatch => {    
    
    const refRoom = db.collection('rooms').doc(room.id);
    const refRoomUser = db.collection('roomUser');
    const users = []; 
    try {
       let usersDocs = await refRoomUser                
      .where('roomId','==',refRoom)
      .where('online','==', true)
      .get();

      
      for(let i=0; i < usersDocs.docs.length; i++ ){
        let user =  await usersDocs.docs[i].data().userId.get();
        users.push({id: user.id, ...user.data()});     
      }
      //.onSnapshot( async snapUsers => {
      //    for(let i=0; i<snapUsers.docs.length; i++ ){
      //      let user =  await snapUsers.docs[i].data().userId.get();
      //      users.push({id: user.id, ...user.data()});     
      //    }
      //});
      
    }catch(err){
      console.log(err);
      dispatch ({
        type: LIST_ROOM_USER,
        payload: users
      }); 
    }finally{
      dispatch ({
        type: LIST_ROOM_USER,
        payload: users
      }); 
    }


}