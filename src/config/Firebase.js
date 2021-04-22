import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBfxMoSxlI5A5r-4TDgsn-TmXHqVrs-qU0",
  authDomain: "uefa-auction.firebaseapp.com",
  projectId: "uefa-auction",
  storageBucket: "uefa-auction.appspot.com",
  messagingSenderId: "229458028536",
  appId: "1:229458028536:web:05dd957f5c4e1fd278d80d",
  measurementId: "G-0XW8HSZWQP",
});

firebase.firestore().settings({ timestampsInSnapshots: true });
export const db = firebaseConfig.firestore();

export default firebase;
