import React, { Component } from 'react';
import '../../style.css';
import firebase from '../db/firestore';
import UserOnline from './UserOnline';


export default class UsersOnline extends Component {

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
    let ref = this.db.collection('users');
    console.log('el room es ' + this.props.room);
    let users = [];
    await ref.where('online','==',true)
              .where('roomId','==', this.props.room)  
              .onSnapshot(res => {
                 users = res.docs.map(e => { return {id: e.id, ...e.data()} });
                  this.setState({
                    users: users
                  },()=>{
                    let temp = [...this.state.users];
                    temp.unshift({
                      id: -1,
                      name: 'Todos'
                    });
                    this.setState({
                      users: temp
                    })
                  });
              });
  }

  render(){
      return(
        <div className=" boxUsers ">
          <ul  className="list-group list-group-flush ">
          {this.state.users.map(user => {
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












