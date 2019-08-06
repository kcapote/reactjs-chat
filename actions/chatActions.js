import { SAVE_COMMENT, LIST_COMMENTS } from './types';
import firebase from '../components/db/firestore';


const db = firebase.firestore();


export const saveComment = (collection, comment) => async dispatch => {

    console.log('el comentario es' , comment);

    //if(true) return;
    if(!comment) return;


    const ref = db.collection(collection);
    const obj = {};
    let out = {};

    if ( collection == 'chats' ) {
        obj = {
          userId:  db.doc(`/users/${comment.userId}`),
          message: comment.message,
          roomId:  db.doc(`/rooms/${comment.roomId}`)
        }
    } else {
       const chatKey = [this.state.user2.id,this.state.user1].sort().join();
        obj = {
          userId:  db.doc(`/users/${comment.userId}`),
          message: comment.message,
          roomId:  db.doc(`/rooms/${comment.roomId}`),
          chatKey
        }
    } 

    try {
      out = await ref.add(obj);
    } catch( err ) {      
      console.log('comment error',err);
      out = err; 
    } finally {
      dispatch({
        type: SAVE_COMMENT,
        payload: out
      });
    }

} 


export const getComments = (roomId) => {
  //const refRoomId = this.db.collection('rooms').doc(roomId);
	//  const chats=[];
	//  let ref = db.collection('chats')
  //            .where("roomId","==",refRoomId)
  //            .orderBy("createdAt", "desc")
  //            .limit(10);
//
	//  await ref.onSnapshot((data)=>{
  //            chats=[];
  //            data.docs.forEach ( async c => {
  //              let data = c.data();
  //              let r = data.userId.get();
  //              let user = await data.userId.get();                 
  //              //let room = await data.roomId.get(); 
  //              let d = {
  //                key: c.id,
  //                message: data.message, 
  //                user: { id: user.id, ...user.data() },
  //               /// room: { id: room.id, ...room.data() }
  //              }
  //              chats.push(d);
  //            });
  //            console.log('reverse', chats.reverse());
  //            setState({... state,
  //                          chats: chats.reverse(),
  //                          isRomm: true
  //                          });
	//   });
}