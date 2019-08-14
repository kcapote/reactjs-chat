import React, {useState, Fragment } from 'react';
import firebase from '../db/firestore';


const CreateRoom  = () => {

  const db = firebase.firestore();

  const [msj, setMsj ] = useState({
    sw: false,
    text: ''
  }); 

  const [room, setRoom] = useState({
              name: '',
              description: '',
              img:'',
              private: false,
              password: '',
              userId: ''
            });

  const handlerCheck = (e)  => {
    setRoom({
      ...room,
      [e.target.name]: e.target.checked
    });
  }


  const handlerChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value
    });
  }

  const saveRoomn = async function(e){

    e.preventDefault();

    const ref = db.collection('rooms');
    let {id}  = await ref.add({
      ...room,
      createdAt: Date.now() 
    });

    if( id ) {

      setRoom({
        name: '',
        description: '',
        img:''
      });

      setMsj({
        sw: true,
        text: 'La sala ha sido creada exitosamente'
      });

      setTimeout(()=>{
        setMsj({
          sw: false,
          text: ''
        });
      }, 3000);  

    } else {

      console.log('Ha ocurrido un error');
    }
    
  } 


  const password = room.private ? (  
    <Fragment>
      <div className="form-group">
        <label className="text-light" forHtml="password">Password</label>
        <input type="password" name="password" onChange={ handlerChange } className="form-control" id="password" placeholder="Password"/>
      </div>
      <div className="form-group">
        <label className="text-light" forHtml="passwordVerify">Repita el Password</label>
        <input type="password" name="passwordVerify" onChange={ handlerChange } className="form-control" id="passwordVerify" placeholder="Password"/>
      </div>
    </Fragment>
  ): null;

  return (
    <div className= "row justify-content-center">
      <div className = "col-md-8">  
        <h3 className="text-light">Creación de nueva sala de Chat</h3>
        { msj.sw ? 
          <div className="alert-success">{msj.text}</div>
          : null
        }

        <form>
          <div className="form-group">
            <label className="text-light" forHtml="name">Nombre</label>
            <input value={room.name} onChange={handlerChange} type="text" name="name"  className="form-control" id="name" aria-describedby="emailHelp" placeholder="Ej. Club literario "/>            
          </div>
          <div className="form-group">
            <label className="text-light" forHtml="description">Descripción</label>
            <input value={room.description} onChange={handlerChange} type="text"  name="description" className="form-control" id="description" placeholder="Ej. Discusión de los grandes clasicos"/>
          </div>
          <div className="form-group">
            <label className="text-light" forHtml="img">Url de la imagen</label>
            <input value={room.img} onChange={handlerChange} type="text" name="img"  className="form-control" id="img" placeholder="https://www.algunaimagen.com/cortazar.png"/>
          </div>
            
          <div className="form-group form-check">
            <input onChange={ handlerCheck } type="checkbox" className="form-check-input" id="private" name="private" />
            <label className="text-light form-check-label" forHtml="private">¿Chat privado? {room.private} </label>
          </div>

          {password}

          <button onClick = { saveRoomn } type="submit" className="btn btn-primary my-3">Crear</button>
        </form>
        <hr/>     
      </div>
    </div>

  );

} 


export default CreateRoom;