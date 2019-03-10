import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2GPWuCln0BcNHWnI5zQDD0xJNE2KNwzM",
  authDomain: "local-comment.firebaseapp.com",
  databaseURL: "https://local-comment.firebaseio.com",
  projectId: "local-comment",
  storageBucket: "local-comment.appspot.com",
  messagingSenderId: "256360370884"
 };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
