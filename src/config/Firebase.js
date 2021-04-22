import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyACuaqMrEl43UYN87TrImVU2hcz4YxBbqY",
  authDomain: "ipl-auction-7dbdb.firebaseapp.com",
  projectId: "ipl-auction-7dbdb",
  storageBucket: "ipl-auction-7dbdb.appspot.com",
  messagingSenderId: "180719577200",
  appId: "1:180719577200:web:7a6f948f957eb1379fecb5",
  measurementId: "G-G8EY9C76G6"
});

firebase.firestore().settings({ timestampsInSnapshots: true });
export const db = firebaseConfig.firestore();

export default firebase;
