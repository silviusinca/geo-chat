import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCxyDWenb1UUPpnIENKrniMVWpXV3EUppw",
  authDomain: "geo-chat1.firebaseapp.com",
  databaseURL: "https://geo-chat1.firebaseio.com",
  projectId: "geo-chat1",
  storageBucket: "geo-chat1.appspot.com",
  messagingSenderId: "264361340200"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();