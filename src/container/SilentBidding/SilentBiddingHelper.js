import React, { useEffect, useState } from "react";
// import { Bids } from "../../store/actions/playerActions";
import { connect } from "react-redux";
import firebase from "firebase";
import { db } from "../../config/Firebase";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  Button,
  Container,
  Grid,
  Typography,
  TableRow,
  TextField,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

const StyledTableRow = withStyles((theme) => ({}))(TableRow);

const SilentBiddingHelper = ({ player, playerId, teamId, auth }) => {
  const [biddingValue, setbiddingValue] = useState("");
  const [maxBid, setmaxBid] = useState(0);
  const [maxBidBy, setmaxBidBy] = useState("");
  const [balance, setBalance] = useState(0);
  //console.log(player);
  const sendBid = (e) => {
    e.preventDefault();
    db.collection("players")
      .doc(player.name)
      .collection("Bids")
      .doc(teamId)
      .set({
        bid: [
          {
            biddingprice: biddingValue,
            timestamp: firebase.firestore.Timestamp.now(),
          },
        ],
      });
    // console.log("Maxbid:", player.maxbid);
    // console.log("Price:", biddingValue);
    if (parseInt(player.maxbid) < parseInt(biddingValue)) {
      db.collection("players").doc(player.name).update({
        maxbid: biddingValue,
        maxbidBy: teamId,
      });
    }
    setbiddingValue("");
    // window.location.reload(true);
  };
  useEffect(() => {
    db.collection("players")
      .doc(player.name)
      .onSnapshot((snapshot) => {
        setmaxBid(snapshot.data().maxbid);
        setmaxBidBy(snapshot.data().maxbidBy);
      });
  }, [player.maxbidBy]);
  useEffect(() => {
    db.collection("users")
      .doc(teamId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setBalance(parseInt(snapshot.data().teamBalance));
        }
      });
  }, []);
  return (
    <>
      <StyledTableRow>
        <StyledTableCell>{player.name}</StyledTableCell>
        <StyledTableCell>{player.club}</StyledTableCell>
        <StyledTableCell>{player.nationalTeam}</StyledTableCell>
        <StyledTableCell>{player.position}</StyledTableCell>
        <StyledTableCell>{player.rating}</StyledTableCell>
        <StyledTableCell>{player.wage}</StyledTableCell>
        <StyledTableCell>{player.baseprice}</StyledTableCell>

        <StyledTableCell>{maxBid}</StyledTableCell>
        <StyledTableCell>
          <form onSubmit={sendBid}>
            <div style={{ display: "flex" }}>
              <TextField
                value={biddingValue}
                onChange={(event) => {
                  event.preventDefault();
                  setbiddingValue(event.target.value);
                }}
              />
              <Button
                style={{ marginLeft: "20px" }}
                variant="contained"
                color="secondary"
                size="small"
                disabled={
                  parseInt(biddingValue) <= parseInt(maxBid) ||
                  maxBidBy === auth.uid ||
                  balance < biddingValue
                }
                type="submit"
                /* onClick={(event) => {
              event.preventDefault();
              Bids(playerId, nextBid);
            }} */
              >
                Bid
              </Button>
            </div>
          </form>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    playerB: state.playerB,
  };
};

export default connect(mapStateToProps)(SilentBiddingHelper);
