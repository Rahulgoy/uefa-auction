import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../store/actions/authActions";

import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
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

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    teamName: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;

    // if (auth.uid !== "zZfVKoYwMWURII0q8tmvK6rvXvi1")
    //   return <Redirect to="/dashboard" />;
    return (
      <div style={formAlignStyle}>
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
            backgroundColor: "#fff",
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
          <Typography component="h1" variant="h4" style={{ fontWeight: "600" }}>
            Sign Up
          </Typography>
          <Grid item xs={10}>
            <Box>
              <form onSubmit={this.handleSubmit}>
                {/* email */}
                <TextField
                  style={{ background: "#F19D56" }}
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

                {/* password */}
                <TextField
                  style={{ background: "#F19D56" }}
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

                {/* First Name */}
                <TextField
                  style={{ background: "#F19D56" }}
                  variant="outlined"
                  margin="normal"
                  name="teamName"
                  label="Team Name"
                  required
                  fullWidth
                  id="teamName"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  style={{ background: "#F19D56" }}
                  variant="outlined"
                  margin="normal"
                  name="initials"
                  label="Initials"
                  required
                  fullWidth
                  id="initials"
                  type="text"
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{
                    margin: "24px 0px 16px",
                    background: "#f48fb1",
                  }}
                >
                  Sign Up
                </Button>

                <div className="center red-text">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </form>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
