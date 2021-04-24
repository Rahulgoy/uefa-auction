import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

const PlayerSlotsHelper = ({ player }) => {
  return (
    <div style={{ backgroundColor: "#33D0FF" }}>
      <TableRow>
        <TableCell>{player.data.name}</TableCell>
        <TableCell>{player.data.category}</TableCell>
        <TableCell>{player.data.status}</TableCell>
        <TableCell>{player.data.display}</TableCell>
        <TableCell>{player.data.class}</TableCell>
        <TableCell>{player.data.maxbid}</TableCell>
        <TableCell>{player.data.maxbidBy}</TableCell>
        <TableCell>{player.data.team}</TableCell>
      </TableRow>
    </div>
  );
};

export default PlayerSlotsHelper;
