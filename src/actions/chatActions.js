import { SAVE_COMMENT, LIST_COMMENTS } from './types';
import firebase from '../components/db/firestore';
import { Observable } from 'rxjs';

const db = firebase.firestore();


export const saveComment = (collection, comment) => async dispatch => {

    
    //if(true) return;
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
                .endAt(dateTo)
                .limit(10)
                );    

    chatObserver = new Observable( observer => {
      ref.onSnapshot( snapshot => {
        snapshot.docs.map( async doc => {
         let user = await doc.data().userId.get();  
         let chat = {
             id: doc.id,
             message: doc.data().message,
             user: { id: user.id, ...user.data() }
         }
         chats.push(chat);
        }       
       );

       console.log({chats});
       let rever = JSON.parse(JSON.stringify(chats));
       rever = rever.reverse();
       console.log({rever});

       observer.next(chats);
      })
    });   
    
    
    chatObserver.subscribe( commments =>{
      dispatch({
        type: LIST_COMMENTS,
        payload: commments
      })
    } )
    

    //  chatObserver.subscribe( comment => {
    //    console.log({comment});
    //  })
    //  console.log('los chats' ,chatObserver);
    
    // chatObserver = new Observable(observer =>{
    //   ref.onSnapshot(snapshot => {
    //     observer.next  ( Promise.all (snapshot.docs.map( async doc => {
    //         let user = await doc.data().userId.get()  
    //         let chat = {
    //             id: doc.id,
    //             message: doc.data().message,
    //             user: {id: user.id, ...user.data() }
    //         }
    //         return chat;      
    //       })).then( comments => comments)
    //       )
    //   });
    // });
    
    //let observer = await ref.onSnapshot(  snap=>(
    //        
    //  snap.docs.map( async doc => {
    //    let user = await doc.data().userId.get()  
    //    let chat = {
    //        id: doc.id,
    //        message: doc.data().message,
    //        user: {id: user.id, ...user.data() }
    //    }
    //    chats.push(chat);
    //   })
    //));    

  } catch ( err ){
    console.log('getComments', err);
    chats = err;
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