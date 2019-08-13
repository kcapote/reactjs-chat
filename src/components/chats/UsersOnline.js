import React, { Component } from 'react';
import '../../style.css';
import firebase from '../db/firestore';
import UserOnline from './UserOnline';
import { connect } from 'react-redux';
import { getUsersRoom } from '../../actions/roomActions';

class UsersOnline extends Component {

  db = firebase.firestore();

  state = {
    users: []
  };

  componentDidMount(){
    
    this.getListUsersOnline();
    
  }

  handlerClick = (user) => {
    if(user.id == -1){
      this.props.viewRoomChats();
    }else{
      this.props.viewPrivateChats(user);
    }
  }

  getListUsersOnline = async() => {
    await this.props.getUsersRoom(this.props.rooms.selected);
   
  }

  render(){
      return(
        <div className=" boxUsers ">
          <ul  className="list-group list-group-flush ">
          {this.props.rooms.roomUsers.map(user => {
                return (
                 <UserOnline key = {user.id}
                  handlerClick = {this.handlerClick}
                  user = {user} />
                )
              })              
              }
          </ul>
        </div>
      )
  }
  
}

const stateMapToProps = (state) =>({
  auth: state.authReducer.auth,
  rooms: state.roomsReducer.rooms
});
export default connect(stateMapToProps,{getUsersRoom})(UsersOnline)












