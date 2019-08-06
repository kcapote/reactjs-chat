import React from 'react';

const ChatBox = ({chat}) => {
  const {me ,message, user} = chat;
  return(
    <div className= { me == user.id ? "meChats" : "yourChats"}> 
      <br/>
      <div className="borde-redondo">
        <div className= "separate p-4">
          <p className= { me == user.id ? "meName" : "youName" }>{ user.firstname }</p>
          <p className="texto"> { message } </p>                        
        </div>  
      </div>
    </div>    
  )
}

export default ChatBox;

