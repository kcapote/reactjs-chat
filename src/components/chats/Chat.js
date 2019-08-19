import React, { Component } from 'react';
import firebase from '../db/firestore';
import UsersOnline from './UsersOnline';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import HeaderChat from './HeaderChat';
import { connect } from 'react-redux';
import { saveComment, getComments } from  '../../actions/chatActions';

class Chat extends Component {

  db = firebase.firestore();
	state = {
    texto: "",
    chats: [],
    firstTime: false
	}

  chatsTemp=[];
  
	db = firebase.firestore();
  query = null;

	componentDidMount(){
		this.getChats();
	}
  
  componentWillUnmount(){
    this.query();
  }

	getChats = async () => {

    const refRoomId = this.db.collection('rooms').doc(this.props.rooms.selected.id);
    let dateTo = this.state.chats.length >0 ? this.state.chats[0].createdAt: '';

    let ref = (dateTo ==='' ? this.db.collection('chats')
    .where("roomId","==",refRoomId)
    .orderBy("createdAt", "desc")
    .limit(10)
    :
    this.db.collection('chats')
    .where("roomId","==",refRoomId)
    .orderBy("createdAt", "desc")
    .endBefore(dateTo)
    .limit(10)
    );  

    this.query = ref.onSnapshot( snapshot => {
      snapshot.docs.map( async doc => {
        let chats = [...this.state.chats];  
        let user = await doc.data().userId.get();  
        let chat = {
            id: doc.id,
            ...doc.data(),
            user: { id: user.id, ...user.data() },
        }
        console.log(chat);
        if(!this.state.chats.find(chatArray => chatArray.id === chat.id )){ 
          chats.push(chat); 
          //for (const chat of chats) {
            this.setState({
              ...this.state,
              chats: [chat,...chats]
            });            
          //}      
        }  
      });      
    });
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
		this.setState({ texto: e.target.value });
   
	}

	componentWillUnmount (){
		//let ref = this.db.collection('users');
		//ref.doc.update()
		console.log('Aja componentWillUnmount-------------------------')
	}

	render (){
    
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
  rooms: state.rooms,
  auth: state.authReducer.auth,
  comments: state.comments
});

export default connect( mapStateToProps, {saveComment, getComments} ) (Chat);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import UsersOnline from './UsersOnline';
// import ChatBox from './ChatBox';
// import MessageBox from './MessageBox';
// import HeaderChat from './HeaderChat';
// import { useDispatch, useSelector } from 'react-redux';
// import { saveComment, getComments } from  '../../actions/chatActions';
// import firebase from '../db/firestore';


// const Chat = (props) => {
//   const db = firebase.firestore();
//   const [texto,setTexto] = useState('');
//   const [chats, setChats] = useState([]);
//   const rooms = useSelector((state) => state.rooms);
//   const auth = useSelector((state) => state.authReducer.auth);

//   useEffect(() => {
//     getChats()
//   },[]);


// 	const getChats = async () => {
//     const refRoomId = db.collection('rooms').doc(rooms.selected.id);
//     let dateTo = chats.length >0 ? chats[0].createdAt: '';

//     let ref = (dateTo ==='' ? db.collection('chats')
//     .where("roomId","==",refRoomId)
//     .orderBy("createdAt", "desc")
//     .limit(10)
//     :
//     db.collection('chats')
//     .where("roomId","==",refRoomId)
//     .orderBy("createdAt", "desc")
//     .endBefore(dateTo)
//     .limit(10)
//     );  

//     ref.onSnapshot( snapshot => {
//       let chatTem = [];
//       snapshot.docs.map( async doc => {
//        let user = await doc.data().userId.get();  
//        let chat = {
//            id: doc.id,
//            ...doc.data(),
//            user: { id: user.id, ...user.data() },
//        }
//        if(!chatTem.find(chatArray => chatArray.id === chat.id )){
//           setChats([...chats, chat]);
//        }  
      
//       }       
//      );
    
//     })

//   }
  
//   const handlerInputKey = async (e) => {
//     if (e.key === 'Enter') {

//       let comment = {
//         userId: auth.user.uid,
//         message: texto,
//         roomId: rooms.selected.id
//       }
//       //await dispacth( saveComment('chats',comment));
//       setTexto('');
//       //getChats();	        
//     }
//   }
  
  

//   const viewPrivateChats = (user) => {
//     // console.log('test  ' + user.id);
//     // this.setState({
//     //     ...this.state,
//     //     user2: user,
//     //     isRomm: false
//     // }, () =>{
//     //     this.loadPrivateChat();
//     //   } 
//     // );    
//   }

//   const viewRoomChats = () => {
//     // this.setState({
//     //   isRomm: true
//     // }, () =>{
//     //     this.getChats();
//     // } );
//   }

//   const	handlerInputChange = (e) => {
//     //console.log(e.target.value)
// 		setTexto( e.target.value );
    
//   }


//   return (
//     <div className="row mb-0 " >
//       <div className = "col-4  p-0" >
//         <UsersOnline  viewPrivateChats = { viewPrivateChats }
//                       viewRoomChats = { viewRoomChats }
//                       />
//       </div>           
//       <div className = "col-8 m-0 border-light containerChats p-0 " >
//         <HeaderChat
//           nameChat = { rooms.selected.name }
//         />
    
//         <div className="messageChats">
//           { chats.length > 0 ? (chats.map(  chat => (
//                 <ChatBox key = { chat.id }
//                         chat= { { ...chat, me: auth.user.uid } } />
//           ))): null
//           }
//           <hr></hr>
//         </div>
//         <div className="footer">
//           <button className="btn btn-success" onClick={ () => {console.log({chats})}}>Ver chats</button>
//           <MessageBox 
//               handlerInputChange = { handlerInputChange }
//               handlerInputKey = { handlerInputKey }
//               message = { texto }
//           />
//         </div>
//       </div> 
//     </div>
//   );
// };

// export default Chat;





