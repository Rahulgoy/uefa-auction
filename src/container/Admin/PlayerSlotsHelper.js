import React from "react";

const PlayerSlotsHelper = ({ player }) => {
  return (
    <div>
      <tr>
        <td>{player.data.name}</td>
        <td>{player.data.category}</td>
        <td>{player.data.status}</td>
        <td>{player.data.display}</td>
        <td>{player.data.class}</td>
        <td>{player.data.maxbid}</td>
        <td>{player.data.maxbidBy}</td>
        <td>{player.data.team}</td>
      </tr>
    </div>
  );
};

export default PlayerSlotsHelper;
