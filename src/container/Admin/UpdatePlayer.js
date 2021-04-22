import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../../config/Firebase";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
} from "@material-ui/core";
import AllLivePlayers from "./AllLivePlayers";
import AllSilentPlayers from "./AllSilentPlayers";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { MuiThemeProvider } from "@material-ui/core/styles";
import adminTheme from "./adminTheme";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    color: theme.palette.common.white,
  },
}))(TableCell);

const UpdatePlayer = ({ auth }) => {
  const [silentPlayers, setSilentPlayers] = useState([]);
  const [livePlayers, setlivePlayers] = useState([]);
  const [playerId, setplayerId] = useState("");
  const fetchLive = () => {
    db.collection("players")
      .where("category", "==", "live")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          console.log(doc.id, "=>", doc.data());
          setlivePlayers((livePlayers) => [
            ...livePlayers,
            { id: doc.id, data: doc.data() },
          ]);
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  };
  const fetchSilent = () => {
    db.collection("players")
      .where("category", "==", "silent")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          console.log(doc.id, "=>", doc.data());
          setSilentPlayers((silentPlayers) => [
            ...silentPlayers,
            { id: doc.id, data: doc.data() },
          ]);
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  };

  console.log(silentPlayers);
  /* let arr = Object.entries(silentPlayers);
  console.log("Arr:", arr); */
  useEffect(() => {
    console.log("Working....");
    fetchLive();
    fetchSilent();
  }, []);
  if (auth.uid !== "HwV4GQfs7kQk6NAGxeHwsInIMfs2") return <Redirect to="/" />;

  return (
    <MuiThemeProvider theme={adminTheme}>
      <Container>
        <h3>Live</h3>

        <div className="tableWrapper">
          <div className="black">
            {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
            <div className="backText">
              <TableContainer>
                <Table className="table" aria-label="customized table">
                  <TableHead stickyHeader>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Category</StyledTableCell>
                      <StyledTableCell>Display</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Maxbid</StyledTableCell>
                      <StyledTableCell>Max Bid by</StyledTableCell>
                      <StyledTableCell>team</StyledTableCell>
                      <StyledTableCell>class</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {livePlayers.map((player) => {
                      return player ? (
                        <AllLivePlayers
                          key={player.id}
                          player={player}
                          //playerId={playerId}
                        />
                      ) : (
                        console.log("No Live player")
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <h3>Silent</h3>

        <div className="tableWrapper">
          <div className="black">
            {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
            <div className="backText">
              <TableContainer>
                <Table className="table" aria-label="customized table">
                  <TableHead stickyHeader>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Category</StyledTableCell>
                      <StyledTableCell>Display</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Maxbid</StyledTableCell>
                      <StyledTableCell>Max Bid by</StyledTableCell>
                      <StyledTableCell>team</StyledTableCell>
                      <StyledTableCell>class</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {silentPlayers.map((player) => {
                      return player ? (
                        <AllSilentPlayers
                          key={player.id}
                          player={player}
                          //playerId={playerId}
                        />
                      ) : (
                        console.log("No player")
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </Container>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(UpdatePlayer);
