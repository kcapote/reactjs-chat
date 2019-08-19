import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SelectRoom from './components/SelectRoom';
import Chat from './components/chats/Chat';
import CreateRoom from './components/admin/CreateRoom';
import ListRooms from './components/admin/ListRooms';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './style.css';

const App = () => {

  return (
    <Router>
      <Provider store = { store }>
        <Navbar />
        <div className="container fill">
          <div className="main">
            <Switch>
              <Route exact path = '/' component = { Login } />
              <Route exact path = '/login' component = { Login } />
              <Route exact path = '/register' component = { Register } />
              <Route exact path = '/home' component = { SelectRoom } />
              <Route exact path = '/chat' component = { Chat } />
              <Route exact path = '/room/admin' component = { CreateRoom } />
              <Route exact path = '/list-romms' component = { ListRooms } />
              <Route component = { SelectRoom }/>
            </Switch>
          </div>  
        </div>  
      </Provider>
    </Router>
  );  

}

export default App;