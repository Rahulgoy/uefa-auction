import {
  Select,
  TextField,
  Button,
  Box,
  Container,
  Grid,
  CssBaseline,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import React, { Component, useState } from "react";
import { db } from "../../config/Firebase";
import { connect } from "react-redux";
import { AddPlayer } from "../../store/actions/authActions";
import { Redirect } from "react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import adminTheme from "./adminTheme";

const formAlignStyle = {
  // backgroundColor: "#010202",
  height: "100vh",
  paddingTop: "40px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
};

class PlayerForm extends Component {
  //const PlayerForm = ({ auth, authError }) => {
  state = {
    name: "",
    age: "",
    baseprice: 0,
    wage: 0,
    Image: "",
    club: "",
    nationalTeam: "",
    position: "",
    rating: "",
    category: "",
    display: "",
    status: "",
    maxbid: 0,
    maxbidBy: "",
    team: "",
    class: "",
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.AddPlayer(this.state);
  };
  //   console.log(AddPlayer);
  /* const addPlayer = (player) => {
    console.log(player.name);
    db.collection("players").doc(player.name).set({
      name: player.name,
      age: player.age,
      baseprice: player.baseprice,
      Batavg: player.Batavg,
      Image: player.Image,
      Runs: player.Runs,
      strikerate: player.strikerate,
      Bowlavg: player.Bowlavg,
      wickets: player.wickets,
      economy: player.economy,
      category: player.category,
      display: player.display,
      status: player.status,
      maxbid: player.maxbid,
      maxbidBy: player.maxbidBy,
      team: player.team,
      class: player.class,
    });
  }; */
  render() {
    const { authError, auth } = this.props;
    // if (auth.uid !== "HwV4GQfs7kQk6NAGxeHwsInIMfs2") return <Redirect to="/" />;
    return (
      <MuiThemeProvider theme={adminTheme}>
        <Container maxWidth="md">
          <CssBaseline />
          <form onSubmit={this.handleSubmit}>
            <Grid container justify="center" alignItems="center" spacing={3}>
              {/* grid 1 */}
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  required
                  fullWidth
                  type="text"
                  id="name"
                  onChange={this.handleChange}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  name="age"
                  label="Age"
                  fullWidth
                  id="age"
                  type="text"
                  onChange={this.handleChange}
                />

                {/* First Name */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="baseprice"
                  label="Base Price"
                  required
                  fullWidth
                  id="baseprice"
                  type="number"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="wage"
                  label="Wage"
                  fullWidth
                  id="wage"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="Image"
                  label="Image"
                  fullWidth
                  id="Image"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="club"
                  label="club"
                  fullWidth
                  id="club"
                  type="text"
                  onChange={this.handleChange}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  name="natinalTeam"
                  label="natinalTeam"
                  fullWidth
                  id="natinalTeam"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="position"
                  label="position"
                  fullWidth
                  id="position"
                  type="text"
                  onChange={this.handleChange}
                />
              </Grid>

              {/* grid 2 */}
              <Grid item xs={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="rating"
                    label="rating"
                    fullWidth
                    id="rating"
                    type="text"
                    onChange={this.handleChange}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "16.5px",
                      justifyContent: "space-around",
                    }}
                  >
                    <div style={{}}>
                      <InputLabel id="demo-simple-select-filled-label">
                        category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="category"
                        name="category"
                        label="category"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"live"}>live</MenuItem>
                        <MenuItem value={"silent"}>silent</MenuItem>
                      </Select>
                    </div>

                    <div style={{}}>
                      <InputLabel id="demo-simple-select-filled-label">
                        display
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="display"
                        name="display"
                        label="display"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"true"}>true</MenuItem>
                        <MenuItem value={"false"}>false</MenuItem>
                      </Select>
                    </div>

                    <div style={{}}>
                      <InputLabel id="demo-simple-select-filled-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="status"
                        name="status"
                        label="status"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"open"}>open</MenuItem>
                        <MenuItem value={"close"}>close</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="maxbid"
                    label="maxbid"
                    fullWidth
                    id="maxbid"
                    type="number"
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="maxbidBy"
                    label="maxbidBy"
                    fullWidth
                    id="maxbidBy"
                    type="text"
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="team"
                    label="team"
                    fullWidth
                    id="team"
                    type="text"
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="class"
                    label="class"
                    fullWidth
                    id="class"
                    type="text"
                    onChange={this.handleChange}
                  />
                </Box>
              </Grid>

              {/* grid 3 */}
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    margin: "0px 0px 16px",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>

            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </form>
        </Container>
      </MuiThemeProvider>
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
    AddPlayer: (player) => dispatch(AddPlayer(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
