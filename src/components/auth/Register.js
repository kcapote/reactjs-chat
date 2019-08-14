import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import Spinner from '../layout/Spinner';
//import firebase from '../db/firestore';

const Register = (props) => {
  
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordVerify, setPasswordVerify ] = useState('');
  const [ error, setError ] = useState({ show: false, message: '' });
  const [loading, setLoading ] = useState(false);

  const registerUser = async(e) => {
    e.preventDefault();
    setLoading(true);

    if(password !== passwordVerify ){
      setError({
        show: true,
        message: 'El password debe coincidir'
      });
      return;      
    }    
    setError({
      show: false,
      message: ''
    });

    const user = { firstName, lastName, email, password };

    await props.register(user);
    setLoading(false);

  }

  useEffect( ()=> {
    console.log(props.auth)
    if(props.auth.code){
      setError({
        show: true,
        message: props.auth.code
      });
    }
    if(props.auth.user){
      props.history.push('/home');
    }

  },[props.auth]);


  const errorRegister = (
    <div className="row alert alert-warning">   
      <small>
        { error.message }
      </small>
    </div>
  );

  if(loading) return <Spinner/>;

  return (
    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div className="col-lg-7">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form className="user"
                     onSubmit={registerUser}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input  required
                            onChange={ (e) => (setFirstName(e.target.value)) }
                            name="firstName" type="text" className="form-control form-control-user" 
                            id="exampleFirstName" placeholder="First Name"/>
                  </div>
                  <div className="col-sm-6">
                    <input  required
                            onChange={ (e) => (setLastName(e.target.value)) }
                            name="lastName" type="text" className="form-control form-control-user" 
                            id="exampleLastName" placeholder="Last Name"/>
                  </div>
                </div>
                <div className="form-group">
                  <input  required
                          onChange={ (e) => (setEmail(e.target.value)) } 
                          name="email" type="email" className="form-control form-control-user" 
                          id="exampleInputEmail" placeholder="Email Address"/> 
                </div>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input  required
                            onChange={ (e) => (setPassword(e.target.value)) }
                            name="password" type="password" className="form-control form-control-user" 
                            id="exampleInputPassword" placeholder="Password"/>
                  </div>
                  <div className="col-sm-6">
                    <input  required
                            onChange={ (e) => (setPasswordVerify(e.target.value)) }
                            name="passwordVerify" type="password" className="form-control form-control-user" 
                            id="exampleRepeatPassword" placeholder="Repeat Password"/>
                  </div>
                </div>
                { error.show ? errorRegister: null }

                <button  type="submit"
                         className="btn btn-primary btn-user btn-block">
                  Register Account
                </button>
                <hr/>
                <a href="index.html" className="btn btn-google btn-user btn-block">
                  <i className="fab fa-google fa-fw"></i> Register with Google
                </a>
                <a href="index.html" className="btn btn-facebook btn-user btn-block">
                  <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                </a>
              </form>
              <hr/>
              <div className="text-center">
                <a className="small" href="forgot-password.html">Forgot Password?</a>
              </div>
              <div className="text-center">
                <a className="small" href="login.html">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  

  )

}

const stateMapToProps = (state) =>({
  auth: state.authReducer.auth
})

export default connect(stateMapToProps, {register}) (Register);
