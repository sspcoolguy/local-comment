import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "가림",
  authDomain: "local-comment.firebaseapp.com",
  databaseURL: "https://local-comment.firebaseio.com",
  projectId: "local-comment",
  storageBucket: "local-comment.appspot.com",
  messagingSenderId: "가림"
 };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
