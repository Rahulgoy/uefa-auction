import React from "react";
import PlayerSection from "./PlayerSection";

const General = ({ player }) => {
  console.log(player);
  console.log(player.teamBalance);
  return (
    <div>
      <h1 style={{ color: "blue" }}>{player.teamName}</h1>
      <h3>{player.initials}</h3>
      <h3 style={{ color: "blue" }}>
        {player.teamBalance ? player.teamBalance / 100 : "No Balance"}Cr
      </h3>
    </div>
  );
};

export default General;
