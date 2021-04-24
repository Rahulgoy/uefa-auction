import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import AllSilentPlayers from "./AllSilentPlayers";
import PlayerSlotsHelper from "./PlayerSlotsHelper";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Button, Table, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { TableRow, TableCell } from "@material-ui/core";

const PlayerSlots = ({ auth }) => {
  const [showPlayers, setShowPlayers] = useState([]);
  const [fetchClass, setFetchClass] = useState("show");
  const [classAndAssign, setclassAndAssign] = useState("");
  const changeslot = (e) => {
    e.preventDefault();
    setShowPlayers([]);
    db.collection("refresh").doc("silent").update({
      value: "true",
    });
    db.collection("players")
      .where("category", "==", "silent")
      .where("class", "==", fetchClass)
      .get()
      .then((snapshot) => {
        //if (snapshot.exists) {
        snapshot.docs.map((doc) => {
          setShowPlayers((showPlayers) => [
            ...showPlayers,
            { id: doc.id, data: doc.data() },
          ]);
          db.collection("players").doc(doc.id).update({
            class: "show",
          });
          /* setShowPlayers((showPlayers) => [
              ...showPlayers,
              { id: doc.id, data: doc.data() },
            ]); */
        });
        //}
      });
  };
  const changeslot_assignteam = (e) => {
    e.preventDefault();
    setShowPlayers([]);
    db.collection("refresh").doc("silent").update({
      value: "true",
    });
    db.collection("players")
      .where("category", "==", "silent")
      .where("class", "==", "show")
      .get()
      .then((snapshot) => {
        //if (snapshot.exists) {
        snapshot.docs.map((doc) => {
          //console.log(doc.data());
          setShowPlayers((showPlayers) => [
            ...showPlayers,
            { id: doc.id, data: doc.data() },
          ]);
          db.collection("players").doc(doc.data().name).update({
            class: classAndAssign,
            team: doc.data().maxbidBy,
            status: "close",
          });
          if (doc.data().maxbidBy !== "") {
            const ref3 = db.collection("users").doc(doc.data().maxbidBy);

            ref3.get().then((snapshot) => {
              if (snapshot.exists) {
                ref3.update({
                  teamBalance:
                    parseInt(snapshot.data().teamBalance) -
                    parseInt(doc.data().maxbid),
                  teamWage:
                    parseInt(snapshot.data().teamWage) -
                    parseInt(doc.data().wage),
                });
              }
            });
          }
        });
        //}
      });
  };
  if (auth.uid !== "HwV4GQfs7kQk6NAGxeHwsInIMfs2")
    return <Redirect to="/login" />;

  console.log(showPlayers);
  /* console.log(fetchClass);
  console.log(classAndAssign); */
  return (
    <div style={{ background: "white", height: "100vh" }}>
      <Container>
        <form>
          <div>
            <Typography variant="h4">A to Show</Typography>
            <TextField
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setFetchClass(e.target.value);
              }}
            />
            <Button style={{ backgroundColor: "tomato" }} onClick={changeslot}>
              Change Slot to show
            </Button>
          </div>
          <div>
            <Typography variant="h4">Show to A but enter A</Typography>
            <TextField
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setclassAndAssign(e.target.value);
              }}
            />
            <Button
              onClick={changeslot_assignteam}
              style={{ backgroundColor: "tomato" }}
            >
              Change Slot and Assign Team
            </Button>
          </div>
        </form>
        <Table
          style={{
            marginTop: "30px",
            color: "#000",
            textTransform: "uppercase",
          }}
        >
          <TableRow style={{ background: "#33D0FF" }}>
            <TableCell>name</TableCell>
            <TableCell>category</TableCell>
            <TableCell>status</TableCell>
            <TableCell>display</TableCell>
            <TableCell>class</TableCell>
            <TableCell>maxbid</TableCell>
            <TableCell>maxbidBy</TableCell>
            <TableCell>team</TableCell>
          </TableRow>
        </Table>
        {showPlayers.map((player) => {
          return player ? (
            <PlayerSlotsHelper key={player.id} player={player} />
          ) : (
            <Typography variant="h2">
              "No Silent player with class Given"
            </Typography>
          );
        })}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(PlayerSlots);
