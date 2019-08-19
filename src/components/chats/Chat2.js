import React, { useEffect, useState } from 'react';
import { saveComment, getComments } from  '../../actions/chatActions';
import { connect } from 'react-redux';
import ChatBox from './ChatBox';
//import MessageBox from './MessageBox';
//import HeaderChat from './HeaderChat';


const Chat = (props) => {

    const [texto,setTexto] = useState('');

    const getChats = async () => {
        let ultChat = props.comments.length > 0 ? props.comments[0].createdAt: '';
        
        console.log('el ultchat es ', ultChat, props.comments.length ,  props.comments[0] );
        await props.getComments(props.rooms.selected.id, ultChat );
        setTexto('');
        let { comments } = props;
        console.log({ comments });
      
    }

    const handlerInputKey = async (e) => {
        if (e.key === 'Enter') {
          let { auth, rooms } = props;
    
          let comment = {
            userId: auth.user.uid,
            message: texto,
            roomId: rooms.selected.id
          }
          await props.saveComment('chats',comment);
          console.log(props);
          setTexto('');
          getChats();	        
        }
    }

    const viewPrivateChats = (user) => {
        // console.log('test  ' + user.id);
        // this.setState({
        //     ...this.state,
        //     user2: user,
        //     isRomm: false
        // }, () =>{
        //     this.loadPrivateChat();
        //   } 
        // );    
      }
    
      const viewRoomChats = () => {
        // this.setState({
        //   isRomm: true
        // }, () =>{
        //     this.getChats();
        // } );
      }
    
      const	handlerInputChange = (e) => {
        //console.log(e.target.value)
            this.setTexto( e.target.value );
        
      }
      
        
    const { comments } = props; 

    // const chatsBox = (
    //     comments.map( chat => (
    //                 <ChatBox key = { chat.id }
    //                         chat= { { ...chat, me: props.auth.user.uid } } />
    //     ))   
    // );

    return ( 
        <div> asda </div>
     );
}
 
const mapStateToProps = state => ({
    rooms: state.roomsReducer.rooms,
    auth: state.authReducer.auth,
    comments: state.chatReducer.comments
});

export default connect( mapStateToProps, {saveComment, getComments} ) (Chat);
  