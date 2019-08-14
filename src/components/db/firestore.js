import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};


var config = {
    apiKey: "AIzaSyA7qFZZXHaycezRl7o5krqLTTKlCUdoeZo",
    authDomain: "pruebitas-bb244.firebaseapp.com",
    databaseURL: "https://pruebitas-bb244.firebaseio.com",
    projectId: "pruebitas-bb244",
    storageBucket: "pruebitas-bb244.appspot.com",
    messagingSenderId: "57836057295",
    appId: "1:57836057295:web:e41821f26ca47cfc"
};
 
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;