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
    auth = await firebase.auth().signInWithEmailAndPassword(email, password);   
  } catch( err ) {
    let { code, message } = err;
    const error = {
      code: errorAuth[code]
    }
    auth = error;
  } finally {
    dispatch({ 
      type: LOGIN,
      payload: auth
    });
  }
};


export const register = (user) => async dispatch => {
  const { firstName, lastName, email, password } = user;
  let out;
  try {
    const auth = await firebase.auth().createUserWithEmailAndPassword(email, password);
    out =  auth;    
    const ref = db.collection('users').doc(auth.user.uid);
    const userDb = await ref.set({
      firstName, 
      lastName, 
      email,
      login: 'email',
      createdAt: Date.now()
    });
    out.userDb = userDb

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



