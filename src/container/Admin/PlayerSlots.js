import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import AllSilentPlayers from "./AllSilentPlayers";
import PlayerSlotsHelper from "./PlayerSlotsHelper";
import { connect } from "react-redux";
import { Redirect } from "react-router";
const PlayerSlots = ({ auth }) => {
  const [showPlayers, setShowPlayers] = useState([]);
  const [fetchClass, setFetchClass] = useState("show");
  const [classAndAssign, setclassAndAssign] = useState("");
  const changeslot = (e) => {
    e.preventDefault();
    setShowPlayers([]);
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
                });
              }
            });
          }
        });
        //}
      });
  };
  if (auth.uid !== "zZfVKoYwMWURII0q8tmvK6rvXvi1")
    return <Redirect to="/login" />;

  console.log(showPlayers);
  /* console.log(fetchClass);
  console.log(classAndAssign); */
  return (
    <div>
      <form>
        <div>
          <h3>A to Show</h3>
          <input
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setFetchClass(e.target.value);
            }}
          />
          <button onClick={changeslot}>Change Slot to show</button>
        </div>
        <div>
          <h3>Show to A but enter A</h3>
          <input
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setclassAndAssign(e.target.value);
            }}
          />
          <button onClick={changeslot_assignteam}>
            Change Slot and Assign Team
          </button>
        </div>
      </form>
      <table>
        <tr>
          <th>name</th>
          <th>category</th>
          <th>status</th>
          <th>display</th>
          <th>class</th>
          <th>maxbid</th>
          <th>maxbidBy</th>
          <th>team</th>
        </tr>
      </table>
      {showPlayers.map((player) => {
        return player ? (
          <PlayerSlotsHelper key={player.id} player={player} />
        ) : (
          <h2>"No Silent player with class Given"</h2>
        );
      })}
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
