import React, { useState,useEffect,Fragment } from "react";
import "./App.css";
//import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./conatainer/Home";
import SignIn from "./conatainer/SignIn";
import SignUp from "./conatainer/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from "./conatainer/Dashboard";
//import "./conatainer/login/style.scss";
//export { login } from "./conatainer/login/login.jsx";

import store from "./store/store";
import { Provider } from "react-redux";
function App() {
  //const [loading, setloading] = useState(false);

    //useEffect(() => {
        //setloading(true)
        //setTimeout(() => {
            //setloading(false)
        //}, 3000)
    //},[])
    
  return (
      //loading ?
            //<ClimbingBoxLoader color={"#D4AF57"} loading={loading} size={50} />
           // :
    <Provider store={store}>
     
      <Router>
      
        <Navbar />
          <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
