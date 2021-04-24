import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

const DisplayPlayer = ({ player }) => {
  return (
    <>
      <TableRow>
        <TableCell>{player.data.name}</TableCell>
        <TableCell>{player.data.rating}</TableCell>
        <TableCell>{player.data.wage}</TableCell>
        <TableCell className="price">{player.data.maxbid}</TableCell>
        <TableCell className="item-text">{player.data.baseprice}</TableCell>
      </TableRow>
    </>
  );
};

export default DisplayPlayer;
