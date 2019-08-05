import React from 'react';

const  Room = ({room, idx, deleteRoom}) => {
  
  return (
    <tr>
      <th scope="row">{idx+1}</th>
      <td>{ room.name }</td>
      <td>{ room.description }</td>
      <td>
        <button className="btn btn-primary">Editar</button>
        <button className="btn btn-danger mx-3"
                onClick={ () => deleteRoom(room) } > Eliminar</button>
      </td>
    </tr>  
  )

}


export default Room;