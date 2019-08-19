import { SAVE_COMMENT, LIST_COMMENTS } from './types';
import firebase from '../components/db/firestore';
import { Observable } from 'rxjs';

const db = firebase.firestore();


export const saveComment = (collection, comment) => async dispatch => {

    
    if(!comment) return;

    const ref = db.collection(collection);
    let obj = {};
    let out = {};

    if ( collection === 'chats' ) {
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


export const getComments = (roomId, dateTo) => async dispatch => {

  const refRoomId = db.collection('rooms').doc(roomId);
	let chats=[];
  let chatObserver;

  try{
    
    let ref = (dateTo ==='' ? db.collection('chats')
                .where("roomId","==",refRoomId)
                .orderBy("createdAt", "desc")
                .limit(10)
                :
                db.collection('chats')
                .where("roomId","==",refRoomId)
                .orderBy("createdAt", "desc")
                .endBefore(dateTo)
                .limit(10)
                );    

    chatObserver = new Observable( observer => {
      ref.onSnapshot( snapshot => {
        chats = [];
        snapshot.docs.map( async doc => {
         let user = await doc.data().userId.get();  
         let chat = {
             id: doc.id,
             ...doc.data(),
             user: { id: user.id, ...user.data() },
         }
         if(!chats.find(chatArray => chatArray.id === chat.id )){
           chats.push(chat);
         }  
        
        }       
       );
       console.log({ chats });
       observer.next(chats);
      })
    });    
    
    // dispatch({
    //   type: LIST_COMMENTS,
    //   payload: chatObserver
    // })  

    chatObserver.subscribe( commments =>{
     dispatch({
       type: LIST_COMMENTS,
       payload: commments
     })
    } );

  } catch ( err ){
    console.log('getComments', err);
    chats = err;
  }
}