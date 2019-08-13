import React from 'react';

const MessageBox = ( props ) => {  
  const { handlerInputKey, handlerInputChange, message } = props; 

  return (
    <div className="border-light bg-light ">
      <div className="mb-3 p-3">
        <input className="form-control" onChange={ handlerInputChange } 
                onKeyPress={ handlerInputKey }  
                placeholder="Ecribe un mensaje aquí"
                value={ message } />            
      </div>
    </div>  
  );
}

export default MessageBox;