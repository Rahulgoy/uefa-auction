import React from "react";
import PlayerSection from "./PlayerSection";

import { Typography } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "../../assets/css/dashboard.css";
import { makeStyles } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  userTeamName: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      padding: 10,
    },
  },
}));

const General = ({ player }) => {
  const classes = useStyles();

  // console.log(player);
  // console.log(player.teamBalance);
  return (
    // team details on left
    <div className="userTeamDetails">
      <Typography color="primary" className="userTeamName" variant="h5">
        {player.teamName}
      </Typography>

      <div className="userTeamDetails">


        <Typography color="secondary" variant="h5">
          {player.teamBalance ? player.teamBalance : "No Balance"}M
        </Typography>
        <Typography color="secondary" variant="h5">
          {player.teamWage ? player.teamWage : "No Wage"} M
        </Typography>
      </div>
    </div>
  );
};

export default General;
