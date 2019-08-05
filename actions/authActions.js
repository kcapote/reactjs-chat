import { LOGIN, REGISTER, LOGOUT } from './types';
import firebase from '../components/db/firestore';
import firebase from '../db/firestore';

const db = firebase.firestore();


const errorAuth = {
  'auth/email-already-in-use': 'El usuario ya se encuentra resgitrado',
  'auth/weak-password': 'El password es vulnerable'
}


export const login = (user) => async dispatch => {
  const { email, password } = user;

  try{

  }catch(err){

  }finally{
    dispatch({
      type: LOGIN,
      payload: auth
    });
  }

  //await firebase.auth().signInWithEmailAndPassword(email, password).then( auth => {
  //  //console.log('login existoso');
  //  dispatch({
  //    type: LOGIN,
  //    payload: auth
  //  });
  //}).catch(function(error) {
  //  const { code, message }= error;
  //  console.log({code, message });
  //});  

};


export const register = (user) => async dispatch => {
  const { fisrtName, lastName, email, login, password } = user;
  let out;
  try {
    const auth = await firebase.auth().createUserWithEmailAndPassword(email, password);
    out = { ... auth }    
    console.log('respCreateUser', resp);
    
  } catch ( err ) {
    let { code, message } = err;
    const error = {
      code: errorAuth[code]
    }
    out = {... error};    
  } finally {
    dispatch({
      type: REGISTER,
      payload: out
    });
  }



 /* firebase.auth().createUserWithEmailAndPassword(email, password).then( auth => {

    const ref = db.collection('user'); 

    const resp = await ref.add({
      fisrtName, 
      lastName, 
      email,
      login: 'email' 
    });
    
    console.log('se creo el usuario ',resp);

    dispatch({
        type: REGISTER,
        payload: auth
    });
    console.log({auth});
  }).catch(function(error) {

    const { errorCode, errorMessage } = error;
    console.log({errorCode, errorMessage});
  });

*/

};


export const logout = () => async dispatch => {
  firebase.auth().signOut().then(function(logout) {
    console.log('LOGOUT',logout);
    dispatch({
        type: LOGOUT,
        payload: {}
    });
  }).catch(function(error) {
    console.log(error);
  });
}



