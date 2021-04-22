import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

import "../assets/css/navbar1.css";

// style here
const useStyle = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  // title: {
  //   flexGrow: 1,
  // },
  // rightToolbar: {
  //   marginLeft: "auto",
  // },
  // linkUnderline: {
  //   textDecoration: "none",
  //   color: "whitesmoke",
  //   cursor: "pointer",
  // },
}));

const Navbar = (props) => {
  const classes = useStyle();
  const { auth } = props;

  const SignedInLinks = (
    <ul className="navMenu">
      {auth.uid === "HwV4GQfs7kQk6NAGxeHwsInIMfs2" ? (
        <li className="li">
          {" "}
          <NavLink to="/admin" className={classes.linkUnderline}>
            <a className="hover-line">Admin</a>
          </NavLink>{" "}
        </li>
      ) : (
        console.log("Not Admin")
      )}

      <li className="li">
        {" "}
        <NavLink to="/" className={classes.linkUnderline}>
          <a className="hover-line">Home</a>
        </NavLink>{" "}
      </li>
      <li className="li">
        {" "}
        <NavLink to="/live" className={classes.linkUnderline}>
          <a className="hover-line">Live Bidding</a>
        </NavLink>{" "}
      </li>
      <li className="li">
        {" "}
        <NavLink to="/silent" className={classes.linkUnderline}>
          <a className="hover-line">Silent Bidding</a>
        </NavLink>{" "}
      </li>
      <li className="li">
        {" "}
        <NavLink to="/dashboard" className={classes.linkUnderline}>
          <a className="hover-line">Dashboard</a>
        </NavLink>{" "}
      </li>
      <li className="li">
        {" "}
        <a onClick={props.signOut} className={classes.linkUnderline}>
          <a className="hover-line">Log Out</a>
        </a>{" "}
      </li>
    </ul>
  );

  const SignedOutLinks = (
    <ul style={{ listStyle: "none", display: "flex" }} className="navMenu">
      {/* <li>
        {" "}
        <Button color="inherit">
          <NavLink to="/signup" className={classes.linkUnderline}>
            Signup
          </NavLink>
        </Button>{" "}
      </li> */}
      <li className="li">
        {" "}
        <NavLink to="/signin" className={classes.linkUnderline}>
          <a className="hover-line">Login</a>
        </NavLink>{" "}
      </li>
    </ul>
  );

  const links = auth.uid ? SignedInLinks : SignedOutLinks;

  return (
    <div>
      <AppBar position="static" color="secondary" className="nav">
        <div className="navItems">
          <img
            className="econ"
            src="https://firebasestorage.googleapis.com/v0/b/ipl-auction-7dbdb.appspot.com/o/logos%2FEconwhite.png?alt=media&token=5c3f837f-8909-4b9d-9c20-7bb53e3718dc"
            alt="ECON"
            width="6%"
          />
          <div className="alllinks"> {links} </div>
          <img
            className="iplLogo"
            src="https://firebasestorage.googleapis.com/v0/b/ipl-auction-7dbdb.appspot.com/o/logos%2Fiplfinal.png?alt=media&token=30c5ac1b-4304-48c0-b53b-8c0ac06e9d81"
            alt="IPL"
            width="6%"
            height="12%"
          />
        </div>
      </AppBar>
    </div>

    // <div className={classes.root}>
    //   <AppBar position="static" color='secondary'>
    //     <Toolbar>
    //       <Link to="/" className="brand-logo" className={classes.linkUnderline}>
    //         <Typography variant="h6" className={classes.title}>
    //           IPL-AUCTION
    //         </Typography>
    //       </Link>

    //       <div className={classes.rightToolbar}>{links}</div>
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
