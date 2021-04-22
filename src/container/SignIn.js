import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../store/actions/authActions";
import { Redirect } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";



const formAlignStyle = {
  backgroundColor: "#010202",
  height: "100vh",
  paddingTop: "40px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
};

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;

    return (
      <div style={formAlignStyle} className='base-container'>
        <CssBaseline />

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          xs={12}
          md={8}
          lg={4}
          style={{
            position: "absolute",
            transform: "translateX(-50%)",
            left: "50%",
            top: "10%",
            backgroundColor: "white",
            background: "rgba(255,255,255)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          {/* form header lock icon */}
          <Avatar
            spacing={1}
            style={{ backgroundColor: "#f48fb1", color: "#000" }}
          >
            <LockOutlinedIcon />
          </Avatar>

          {/* form header */}
          <Typography component="h1" variant="h4" style={{ fontWeight: "600" }} className='header'>
            Sign In
          </Typography>

          {/* signin form */}
          <Grid item xs={10} md={6} lg={12} className='content'>
            <Box>
              <form onSubmit={this.handleSubmit} className='form'>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  type="email"
                  id="email"
                  onChange={this.handleChange}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  id="password"
                  type="password"
                  onChange={this.handleChange}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    margin: "24px 0px 16px",
                  }}
                  className='footer'
                >
                  Sign In
                </Button>

                <div className="center red-text">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </form>
            </Box>
          </Grid>
        </Grid>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
