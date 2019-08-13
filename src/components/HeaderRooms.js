import React, {Component} from 'react'; 

const HeaderRooms = (props) => {
  return(
  
    <div className="jumbotron jumbotron-fluid mb-5 rounded p-5">
      <div className="container">
        <h1 className="display-4">Chats</h1>
        <p className="lead">Seleccione una sala de chat principal o busque alguna creada por la comunidad.</p>
        <hr className="my-4"/>  
        <input type="text" className="form-control" placeholder="Escriba el nombre de la sala" aria-label="Recipient's username" aria-describedby="button-addon2"/>
      </div>
    </div>


  )
}

export default HeaderRooms;