import React from 'react';

const HeaderChat = ({nameChat}) => {

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">{nameChat ? nameChat: 'Chats' }</a>
    </nav>
  )
}

export default HeaderChat;