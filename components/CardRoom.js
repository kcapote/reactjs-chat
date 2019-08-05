import React from 'react';


const Room = ({ room, handlerClick, user }) => {

  const roomIn = () => {
    handlerClick( room, user );
  }

  return (
    <div className="card" key={room.id} >
      <img src={ room.img } className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{room.name}</h5>
        <p className="card-text">{room.description}</p>
        <button  className="btn btn-primary mb-3" onClick={ roomIn }> Entrar </button>
      </div>
    </div>
  );
}

export default Room;