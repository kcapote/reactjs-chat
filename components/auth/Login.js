import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import Spinner from '../layout/Spinner';

  const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ error, setError ] = useState(false);
  const [loading, setLoading ] = useState(false);

  useEffect( () => {
    const { auth } = props;
    if( auth.user ){
      props.history.push('/home');
    }     
  },[props.auth]);

  const login = async (e) => {
    e.preventDefault();
    console.log('comenzando login');
    setLoading(true);    
    await props.login({email, password});
    setLoading(false);
    
    //await props.login({ email, password }).then( () => {
    //  console.log('LOGIN',props)
    //  if(!props.auth.user) {
    //    console.log('error');
    //    setError(true);
    //  }
    //  setLoading(false);
    //});
    //console.log('terminando login');
   };

  
  
  const errorLogin = (
    <div className="row alert alert-warning">   
      <small>
        Correo o contraseña incorrectos
      </small>
    </div>);

  if(loading){
    return <Spinner/>
  }

   return(
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">            
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form onSubmit={ login }
                        className="user">
                    <div className="form-group">
                      <input  name="email"
                              onChange={(e)=>{ setEmail(e.target.value)} } required
                              type="email" className="form-control form-control-user" 
                              id="exampleInputEmail" aria-describedby="emailHelp" 
                              placeholder="Enter Email Address..."/>
                    </div>
                    <div className="form-group">
                      <input  name="password"
                              onChange={ (e)=>{ setPassword(e.target.value) } }
                              required
                              type="password" className="form-control form-control-user" 
                              id="exampleInputPassword" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                      </div>
                    </div>
                    {error ? errorLogin: null}
                    <button type="submit" 
                            className="btn btn-primary btn-user btn-block">
                      Login
                    </button>
                    <hr/>
                    <a href="index.html" className="btn btn-google btn-user btn-block">
                      <i className="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="index.html" className="btn btn-facebook btn-user btn-block">
                      <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a>
                  </form>
                  <hr/>
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div className="text-center">
                    <Link to='/register' className="small" >Create an Account!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div> 
   )
   
 }

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth
});

 export default connect( mapStateToProps, {login} ) ( Login) ;