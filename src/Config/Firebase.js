import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCe5xNMVO3I3_4QU4ovMUWgx50oDdLG8vY",
    authDomain: "quizwebapplication.firebaseapp.com",
    databaseURL: "https://quizwebapplication.firebaseio.com",
    projectId: "quizwebapplication",
    storageBucket: "quizwebapplication.appspot.com",
    messagingSenderId: "883543694273",
    appId: "1:883543694273:web:0702694426c2a889"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase; 