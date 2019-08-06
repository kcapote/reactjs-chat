import { SAVE_COMMENT, LIST_COMMENTS } from './types';
import firebase from '../components/db/firestore';


const db = firebase.firestore();


export const saveComment = (collection, comment) => async dispatch => {

    
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


export const getComments = (roomId) => async dispatch => {

  const refRoomId = db.collection('rooms').doc(roomId);
	let chats=[];
	
  try{
    let ref = db.collection('chats')
                .where("roomId","==",refRoomId)
                .orderBy("createdAt", "desc")
                .limit(10);
    let observer = await ref.onSnapshot(  snap=>(
            
      snap.docs.map( async doc => {
        let user = await doc.data().userId.get()  
        let chat = {
            id: doc.id,
            message: doc.data().message,
            user: {id: user.id, ...user.data() }
        }
        chats.push(chat);
 
      })
    ));  

  

  } catch ( err ){
    console.log('getComments', err);
    chats = err;

  } finally{
    let chatsTemp =  JSON.parse(JSON.stringify(chats)) ;
    console.log('finally', chats);
    console.log('finally2', chatsTemp);
    //chats=[];
    dispatch({
      type: LIST_COMMENTS,
      payload: chats
    })
  }
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