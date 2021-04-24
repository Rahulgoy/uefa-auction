import React, { useState } from "react";
import { db } from "../../config/Firebase";

import { MuiThemeProvider } from "@material-ui/core/styles";

import adminTheme from "./adminTheme";

const AllLivePlayers = ({ player }) => {
  const [updatePlayer, setUpdatePlayer] = useState({
    name: "",
    category: "",
    display: "",
    status: "",
    maxbid: 0,
    maxbidBy: "",
    team: "",
    class: "",
  });
  const refresh = (e) => {
    e.preventDefault();
    db.collection("refresh").doc("live").update({
      value: "true",
    });
    db.collection("players").doc(player.data.name).update({
      display: "false",
    });
  };
  const assign = (e) => {
    e.preventDefault();

    db.collection("players").doc(player.data.name).update({
      team: player.data.maxbidBy,
      status: "close",
    });
    if (player.data.maxbidBy !== "") {
      const ref3 = db.collection("users").doc(player.data.maxbidBy);

      ref3.get().then((snapshot) => {
        //if (snapshot.exists) {
        ref3.update({
          teamBalance:
            parseInt(snapshot.data().teamBalance) -
            parseInt(player.data.maxbid),
          teamWage:
            parseInt(snapshot.data().teamWage) - parseInt(player.data.wage),
        });
        //}
      });
    }
    setTimeout("window.location.reload();", 3000);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUpdatePlayer({
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    db.collection("players").doc(player.data.name).update(updatePlayer);
  };
  console.log(updatePlayer);
  return (
    <MuiThemeProvider theme={adminTheme}>
      <div>
        <form onSubmit={handlesubmit}>
          <td>{player.data.name}</td>
          <td>
            <select
              name="category"
              onChange={handleChange}
              defaultValue={player.data.category}
            >
              <option value="live">live</option>
              <option value="silent">silent</option>
            </select>{" "}
          </td>
          <td>
            <select
              name="display"
              onChange={handleChange}
              defaultValue={player.data.display}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>{" "}
          </td>
          <td>
            <select
              name="status"
              onChange={handleChange}
              defaultValue={player.data.status}
            >
              <option value="open">open</option>
              <option value="close">close</option>
            </select>{" "}
          </td>
          <td>
            <select
              name="class"
              onChange={handleChange}
              defaultValue={player.data.class}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>{" "}
          </td>
          <td>
            <input
              name="maxbid"
              onChange={handleChange}
              type="number"
              defaultValue={player.data.maxbid}
            />
          </td>
          <td>
            <input
              name="maxbidBy"
              type="text"
              defaultValue={player.data.maxbidBy}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="team"
              type="text"
              defaultValue={player.data.team}
              onChange={handleChange}
            />
          </td>
          <button type="submit">Update</button>
          <button onClick={refresh}>Refresh</button>
          <button onClick={assign}>Assign Team</button>
        </form>
      </div>
    </MuiThemeProvider>
  );
};

export default AllLivePlayers;
