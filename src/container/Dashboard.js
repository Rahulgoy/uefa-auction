import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { teamStats } from "../store/actions/playerActions";
import { db } from "../config/Firebase";
import General from "./Dashboards/General";

import { Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import PlayerSection from "./Dashboards/PlayerSection";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../assets/css/dashboard.css";
const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "30px",
    padding: "1.2rem",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.primary,
    background: "#555555",
  },
}));

const Dashboard = ({ auth }) => {
  const [team, setTeam] = useState(null);
  const classes = useStyles();

  db.collection("refresh")
    .doc("live")
    .onSnapshot((snapshot) => {
      if (snapshot.data().value === "true") {
        db.collection("refresh").doc("live").update({
          value: "false",
        });
        setTimeout("window.location.reload();", 3000);
      }
    });
  const fetchTeam = () => {
    db.collection("users").onSnapshot((snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      result.map((res) => {
        if (res.id === auth.uid) {
          // console.log(res.data.teamBalance);
          // console.log(typeof res.data.teamBalance);
          setTeam(res.data);
        }
      });
    });
  };
  //console.log(team);
  if (team === null) console.log("NULL");
  useEffect(() => {
    fetchTeam();
  }, []);

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className={classes.root}>
    <Typography variant="h3" align='center'
      style={{
      color:'goldenrod',
      // fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom:'30px'
    }}>
        Dashboard
    </Typography>
    
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            {team === null ? console.log("No team") : <General player={team} />}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <PlayerSection teamId={auth.uid} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Dashboard);
