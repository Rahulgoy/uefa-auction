import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { db } from "../../config/Firebase";
import LiveBiddingHelper from "./LiveBiddingHelper";

const LiveBidding = ({ auth }) => {
  const [play, setPlay] = useState({});
  const [playerId, setPlayerId] = useState("admin");
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
  useEffect(() => {
    console.log("Working....");
    db.collection("players")
      .where("display", "==", "true")
      .where("category", "==", "live")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          //console.log(doc.id, "=>", doc.data());
          setPlay(doc.data());
          setPlayerId(doc.id);
        });
      });
  }, []);
  useState(() => {}, []);
  if (!auth.uid) return <Redirect to="/signin" />;
  /* if (Status === "false") {
    window.location.reload();
  } */
  return (
    <div>
      {play !== null && playerId !== "admin" ? (
        <LiveBiddingHelper
          player={play}
          playerId={playerId}
          teamId={auth.uid}
        />
      ) : (
        <Typography
          variant="h2"
          color="primary"
          align="center"
          style={{ marginTop: "5%" }}
        >
          NO PLAYER TO BID
        </Typography>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

/* const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
}; */

export default connect(mapStateToProps)(LiveBidding);

/* const fetchsome = () => {};

 const fetchsome = () => {
  db.collection("players")
    .where("display", "==", "true")
    .where("category", "==", "live")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        setPlay(doc.data());
        setPlayerId(doc.id);
      });
    })
    .catch((error) => {
      console.log("Could not fetch");
    });
}; */
//console.log(play);
