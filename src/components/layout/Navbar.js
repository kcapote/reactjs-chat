import React, { useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';



const  Navbar = (props) => {

const { name } = props;
const { auth } = props;

const logout = () => {
  props.logout().then(resp => 
    window.location.href = "https://reactjs-chat.stackblitz.io/login"
  );
}   


const optionLogged = (
    <Fragment>
      <li className="nav-item">
        <NavLink exact strict to="/home" 
                activeClassName="active" 
                className="nav-link"> Home </NavLink>            
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Administrar Salas
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <NavLink exact strict to="/room/admin" 
                activeClassName="active" 
                className="dropdown-item"> Crear Sala </NavLink>
          <div className="dropdown-divider"></div>
          <NavLink exact strict to="/list-romms" 
                activeClassName="active" 
                className="dropdown-item"> Mis Salas </NavLink>  
        </div>            
      </li> 
    </Fragment>
);

return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <NavLink exact strict to="/home" 
                    className="navbar-brand">C</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        { Object.keys(auth).length > 1 ? optionLogged : null }
        <li> 
          {  Object.keys(auth).length > 1 ?
              (<button onClick={ logout }
                  className="btn btn-primary"> Logout </button>) 
              :
              (<NavLink to='/login'
                  className="btn btn-primary"> Login </NavLink>)  
          }
        </li>
      </ul>
    </div>
  </nav>
);

}

const stateMapToProps = (state) => ({
  auth: state.authReducer.auth
});

export default connect(stateMapToProps,{logout})(Navbar); 