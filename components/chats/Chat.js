import React, { Component } from 'react';
import firebase from '../db/firestore';
import UsersOnline from './UsersOnline';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import HeaderChat from './HeaderChat';
import { connect } from 'react-redux';
import { saveComment } from  '../../actions/chatActions';

class Chat extends Component {

	userChats = [{
	  key: "1",
	  userName: "System",
	  message: "Bienvenido al chat react",
	}];

	state = {
	        id: '',
	        userName: '',
	        chats: [],
	        texto: "",
	        users: [],
          meId: '',
          user2: {},
          isRomm: true,
          nameRoom: '',
          user: '',
          room: ''
	}

  chatsTemp=[];

	db = firebase.firestore();

	componentDidMount(){
    //console.log(this.props);
    //this.setState({
    //  ... this.state,
    //  userName: this.props.match.params.name,
    //  meId: this.props.match.params.userId
    //})
		//this.getChats();
	}



	getChats = async () => {
	  this.chatsTemp=[];
	  let ref = this.db.collection('chats');

	  await ref.where("roomId","==",this.props.match.params.room)
             .orderBy("createdAt", "desc")
             .limit(10)
             .onSnapshot((data)=>{
              this.chatsTemp=[];
              data.docs.forEach (c => {
                let d = {
                  key: c.id,
                  ...c.data(),        
                }
                this.chatsTemp.push(d);
              });
              //console.log(this.chatsTemp.reverse());
              this.setState({... this.state,
                            chats: this.chatsTemp.reverse(),
                            isRomm: true
                            });
	   });

	}

  loadPrivateChat = async() => {
    this.chatsTemp=[];
    let chatKey = [this.state.user2.id,this.state.meId].sort().join();
    console.log(chatKey);

	  let ref = this.db.collection('privateChats');
    await ref.where('chatKey', '==', chatKey)
             .orderBy("createdAt", "desc")
             .limit(10)
             .onSnapshot((data)=>{
              this.chatsTemp=[];
              data.docs.forEach (chat => {
                let d = {
                  key: chat.id,
                  ...chat.data(),        
                }
                this.chatsTemp.push(d);
              });
              //console.log(this.chatsTemp.reverse());
              this.setState({chats: this.chatsTemp.reverse() });
	   });

  }

	handlerInputKey = (e) => {
	    if (e.key === 'Enter') {
	      this.saveComment(e);	        
	    }
	}

	handlerClick = (e) => {
    this.saveComment(e);
	}

  saveComment = (e) => {
    if(this.state.isRomm == true){
      let elem = {
            userId: this.state.meId,
            name: this.state.userName,
            message: this.state.texto,
            roomId: this.props.match.params.room            
      }
      this.setState({texto: ""});
      this.db.collection('chats').add(elem);
    } else {
      let chatKey = [this.state.user2.id,this.state.meId].sort().join();
      let elem = {
            userId: this.state.meId,
            name: this.state.userName,
            message: this.state.texto,
            chatKey            
      }
      this.setState({texto: ""});
      this.db.collection('privateChats').add(elem);
    }
  }

  viewPrivateChats = (user) => {
    console.log('test  ' + user.id);
    this.setState({
        ... this.state,
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
    console.log(e.target.value)
		this.setState({ texto: e.target.value })
	}

	componentWillUnmount (){
		//let ref = this.db.collection('users');
		//ref.doc.update()
		console.log('Aja componentWillUnmount-------------------------')
	}

	render (){
    console.log(this.props);
    const {rooms} = this.props; 

		return(			
      <div className="row mb-0 " >
        <div className = "col-4  p-0" >
          <UsersOnline  viewPrivateChats = { this.viewPrivateChats }
                        viewRoomChats = { this.viewRoomChats }                                      
                        room = { rooms.selected.id } 
                        />
        </div>           
        <div className = "col-8 m-0 border-light containerChats p-0 " >
          <HeaderChat
            nameChat = {this.state.nameRoom}
          />
          
          <div className="messageChats">
            {this.state.chats.map( chat => (
              <ChatBox chat={ {...chat, userName: this.state.userName} }/>
            ))}
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
  auth: state.authReducer.auth
});

export default connect(mapStateToProps,{ saveComment })(Chat)