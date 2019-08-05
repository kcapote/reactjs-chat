import React from 'react';

const ChatBox = ({chat}) => {
  const {userName,name,message} = chat;
  return(
    <div className= { name.toLocaleLowerCase() == userName.toLocaleLowerCase() ? "meChats" : "yourChats"}> 
      <br/>
      <div className="borde-redondo">
        <div className= "separate p-4">
          <p className= { name == userName ? "meName" : "youName" }>{ name }</p>
          <p className="texto"> { message } </p>                        
        </div>  
      </div>
    </div>    
  )
}

export default ChatBox;

