import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//styles
import "./App.css";

//Store
import store from "./store/store";
import { Provider } from "react-redux";

//Pages
// import Home from "./container/Home";
import SignIn from "./container/SignIn";
import SignUp from "./container/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from "./container/Dashboard";
import LiveBidding from "./container/LiveBidding/LiveBidding";
import SilentBidding from "./container/SilentBidding/SilentBidding";

// Dark Theme
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/js/DarkTheme";
import Admin from "./container/Admin/Admin";
import PlayerForm from "./container/Admin/PlayerForm";
import UpdatePlayer from "./container/Admin/UpdatePlayer";
import UserUpdate from "./container/Admin/UserUpdate";
import PlayerSlots from "./container/Admin/PlayerSlots";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/live" component={LiveBidding} />
            <Route exact path="/silent" component={SilentBidding} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/playerform" component={PlayerForm} />
            <Route exact path="/updateplayer" component={UpdatePlayer} />
            <Route exact path="/updateuser" component={UserUpdate} />
            <Route exact path="/playerslot" component={PlayerSlots} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
