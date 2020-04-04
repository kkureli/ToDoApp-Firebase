import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const config = {
  apiKey: "AIzaSyCSPedDd2_aBAoH9Czld8b4gSQvTDcbE04",
  authDomain: "todo-app-38640.firebaseapp.com",
  databaseURL: "https://todo-app-38640.firebaseio.com",
  projectId: "todo-app-38640",
  storageBucket: "todo-app-38640.appspot.com",
  messagingSenderId: "216777376486",
  appId: "1:216777376486:web:1d002595844b4773c67127",
  measurementId: "G-5BWTFEHWQ3"
};

firebase.initializeApp(config);

firebase.firestore();

export default firebase;
