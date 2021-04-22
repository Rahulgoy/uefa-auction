import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";
import App from "./App";

//This is done taaki nav links firebase initialise hone se pehle render na kare

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
