import React, { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import "../../assets/css/biddingHistory.css";

const useStyles = makeStyles({
  root: {
    // s
  },
});

const BiddingHistory = forwardRef(({ bid }, ref) => {
  const classes = useStyles();
  // console.log(bid);
  const [team, setTeam] = useState({
    teamName: "",
    initials: "",
  });
  const fetchUser = () => {
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        //console.log("Doc:", doc.id, "  Bid:", bid.teamId);
        if (doc.id === bid.teamId) {
          //console.log("Doc:", doc.id, "  Bid:", bid.teamId);
          //console.log(doc.data());
          //console.log(bid);

          setTeam({
            teamName: doc.data().teamName,
            initials: doc.data().initials,
          });
        }
      });
    });
  };
  useLayoutEffect(() => {
    fetchUser();
  }, [bid]);
  //console.log("team:", team);
  return (
    <table className={classes.root} ref={ref}>
      <tr>
        <div className="biddingHistorySection">
          {" "}
          <Typography
            variant="h6" 
            style={{ marginLeft:'40px', color: "goldenrod", fontWeight: "500", wordSpacing: '5px' }}
            className="teamNameOnLeft"
          >
            {" "}
            {team.teamName} &nbsp;
            {"("}
            {team.initials}
            {")"}:{" "}
          </Typography>{" "}
          <Typography variant="h6" className="bidOnRight" style={{color: 'white', marginLeft: '20px'}}>
            {" "}
            {bid.biddingprice}
          </Typography>
        </div>
      </tr>
    </table>
  );
});

export default BiddingHistory;
