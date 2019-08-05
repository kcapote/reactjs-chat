import { SAVE_COMMENT, LIST_COMMENTS } from './types';
import firebase from '../components/db/firestore';


const db = firebase.firestore();


export const saveComment = (collection, comment) = async dispatch => {

    
    if(!comment) return;

    const ref = db.collection(collection);
    const obj = {};
    let out ={};

    if ( collection == 'chats' ) {
        obj = {
          userId: `/users/${comment.userId}`,
          message: coment.message,
          roomId: `/rooms/${coment.roomId}`
        }
    } else {
       const chatKey = [this.state.user2.id,this.state.user1].sort().join();
        obj = {
          userId: `/users/${comment.userId}`,
          message: coment.message,
          roomId: `/rooms/${coment.roomId}`,
          chatKey
        }
    } 

    try {
      out = await ref.add(obj);
    } catch( err ) {      
      console.log(err);
      out = err; 
    } finally {
      dispatch({
        type: SAVE_COMMENT,
        payload: out
      });
    }

    //if(isRoom == true){
    //  let elem = {
    //        userId: comment.meId,
    //        name: comment.userName,
    //        message: this.state.texto,
    //        roomId: this.props.match.params.room            
    //  }
    //  this.setState({texto: ""});
    //  this.db.collection('chats').add(elem);
    //} else {
    //  let chatKey = [this.state.user2.id,this.state.meId].sort().join();
    //  let elem = {
    //        userId: this.state.meId,
    //        name: this.state.userName,
    //        message: this.state.texto,
    //        chatKey            
    //  }
    //  this.setState({texto: ""});
    //  this.db.collection('privateChats').add(elem);
    //}
} 
