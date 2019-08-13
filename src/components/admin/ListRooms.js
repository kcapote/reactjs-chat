import React, { useState, useEffect, Fragment} from 'react';
import firebase from '../db/firestore';
import Room from './Room';

const ListRooms = () => {
  const db = firebase.firestore();
  const [rooms, setRooms] = useState([]);
  const []

  useEffect(()=>{

    loadRooms();
  },[]);
  
  const  loadRooms= () =>{
    let temp =[];
    let ref = db.collection("rooms");
    ref.onSnapshot((rooms) => {
      temp = rooms.docs.map( doc => {
          return {
            id: doc.id,
            ... doc.data()
          }
      });
      console.log( temp);
      setRooms(temp);
    })
  
  }

  const deleteRoom = (room) => {
    console.log('en el delete ' );
    console.log(room);
  }  

  return (

    
    <Fragment>
    <h3 className="text-light">Lista de salas creadas</h3> 

    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripccion</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map( (room, idx) => (
          <Room room = { room } 
                idx = { idx }
                deleteRoom = { deleteRoom }/>  
        )
        )}
      </tbody>
    </table>      
  </Fragment>
  );

}


export default ListRooms;