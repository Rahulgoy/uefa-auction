import authReducer from "./authReducer";

import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import silentplayerReducer from "./playerReducer";

export default combineReducers({
  auth: authReducer,
  playerB: silentplayerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
