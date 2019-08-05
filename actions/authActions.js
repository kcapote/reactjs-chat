import { LOGIN, REGISTER, LOGOUT } from './types';
import firebase from '../components/db/firestore';
import firebase from '../db/firestore';

const db = firebase.firestore();


const errorAuth = {
  'auth/email-already-in-use': 'El usuario ya se encuentra resgitrado',
  'auth/weak-password': 'El password es vulnerable',
  'auth/wrong-password': 'Usuario o password es incorrecto'
}


export const login = (user) => async dispatch => {
  const { email, password } = user;
  let auth = {};
  try {
    auth = firebase.auth().signInWithEmailAndPassword(email, password); 
    console.log('try',auth);

  } catch( err ) {
    console.log('catch', err);
    let { code, message } = err;
    const error = {
      code: errorAuth[code]
    }
    auth: error;

  } finally {
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
  const { firstName, lastName, email, password } = user;
  let out;
  try {
    const auth = await firebase.auth().createUserWithEmailAndPassword(email, password);
    out = { ... auth }    
    console.log('respCreateUser', auth);
    const ref = db.collection('users').doc(auth.user.uid);
    const userDb = await ref.set({
      firstName, 
      lastName, 
      email,
      login: 'email',
      createdAt: Date.now()
    });
    auth.userDb = userDb

  } catch ( err ) {
    console.log(err)
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



