import React from 'react';

const HeaderChat = ({nameChat}) => {

  return (
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand">{nameChat ? nameChat: 'Chats' }</a>
    </nav>
  )
}

export default HeaderChat;