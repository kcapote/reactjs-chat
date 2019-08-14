import React, { Component } from 'react';
import firebase from '../db/firestore';
import UsersOnline from './UsersOnline';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import HeaderChat from './HeaderChat';
import { connect } from 'react-redux';
import { saveComment, getComments } from  '../../actions/chatActions';

class Chat extends Component {

	state = {
    texto: "",
    chats: []
	}

  chatsTemp=[];

	db = firebase.firestore();

	componentDidMount(){
		this.getChats();
	}
  

	getChats = async () => {
    let ultChat = this.props.comments.length > 0 ? this.props.comments[0].createdAt: '';
    console.log('el ultchat es ', ultChat, this.props.comments.length);
    await this.props.getComments(this.props.rooms.selected.id, ultChat );
    this.setState({ texto: '' });
    let { comments } = this.props;
    console.log({ comments });
    

    // comments.subscribe( comments => {
    //   //let tempChats = [ ...this.state.chats, ...comments]; 
    //   this.setState( { 
    //       ...this.state, 
    //       chats: comments
    //   },()=>{
    //     console.log('los chats', this.state.chats);
    //   });
    // });    
	}

 // loadPrivateChat = async() => {
 //   this.chatsTemp=[];
 //   let chatKey = [this.state.user2.id,this.state.meId].sort().join();
//
//	  let ref = this.db.collection('privateChats');
 //   await ref.where('chatKey', '==', chatKey)
 //            .orderBy("createdAt", "desc")
 //            .limit(10)
 //            .onSnapshot((data)=>{
 //             this.chatsTemp=[];
 //             data.docs.forEach (chat => {
 //               let d = {
 //                 id: chat.id,
 //                 ...chat.data(),        
 //               }
 //               this.chatsTemp.push(d);
 //             });
 //             //console.log(this.chatsTemp.reverse());
 //             this.setState({chats: this.chatsTemp.reverse() });
//	   });
 // }

	handlerInputKey = async (e) => {
	    if (e.key === 'Enter') {
        let { auth, rooms } = this.props;

        let comment = {
          userId: auth.user.uid,
          message: this.state.texto,
          roomId: rooms.selected.id
        }
        await this.props.saveComment('chats',comment);
        console.log(this.props);
        this.setState({texto: ""});
        this.getChats();	        
	    }
	}

	handlerClick = async (e) => {

    let { auth, rooms } = this.props;

    let comment = {
      userId: auth.user.uid,
      message: this.state.texto,
      roomId: rooms.selected.id
    }
    await this.props.saveComment('chats',comment);
    this.setState({texto: ""});
	}


  viewPrivateChats = (user) => {
    console.log('test  ' + user.id);
    this.setState({
        ...this.state,
        user2: user,
        isRomm: false
    }, () =>{
        this.loadPrivateChat();
      } 
    );    
  }

  viewRoomChats = () => {
    this.setState({
      isRomm: true
    }, () =>{
        this.getChats();
    } );
  }
 
	handlerInputChange = (e) => {
    //console.log(e.target.value)
		this.setState({ texto: e.target.value });
   
	}

	componentWillUnmount (){
		//let ref = this.db.collection('users');
		//ref.doc.update()
		console.log('Aja componentWillUnmount-------------------------')
	}

	render (){
    
    // const {rooms} = this.props; 

    const chatsBox = (
       this.state.chats.map( chat => (
                 <ChatBox key = { chat.id }
                          chat= { { ...chat, me: this.props.auth.user.uid } } />
       ))
      
    );

		return(			
      <div className="row mb-0 " >
        <div className = "col-4  p-0" >
          <UsersOnline  viewPrivateChats = { this.viewPrivateChats }
                        viewRoomChats = { this.viewRoomChats }
                        />
        </div>           
        <div className = "col-8 m-0 border-light containerChats p-0 " >
          <HeaderChat
            nameChat = { this.props.rooms.selected.name }
          />
          
          <div className="messageChats">
            {this.state.chats.length >1 ? chatsBox: null }
            <hr></hr>
          </div>
          <div className="footer">
            <MessageBox 
                handlerInputChange = {this.handlerInputChange}
                handlerInputKey = {this.handlerInputKey}
                message = { this.state.texto }
            />
          </div>
        </div> 
      </div>
		);

	}


}

const mapStateToProps = state => ({
  rooms: state.roomsReducer.rooms,
  auth: state.authReducer.auth,
  comments: state.chatReducer.comments
});

export default connect( mapStateToProps, {saveComment, getComments} ) (Chat);