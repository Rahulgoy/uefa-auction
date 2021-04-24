import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

const DisplayPlayer = ({ player, auth, teamId }) => {
  return (
    <>
      <TableRow>
        <TableCell>{player.data.name}</TableCell>
        <TableCell>{player.data.rating}</TableCell>
        <TableCell>{player.data.wage}</TableCell>
        {teamId === auth.uid ? (
          <TableCell className="price">{player.data.maxbid}</TableCell>
        ) : null}

        <TableCell className="item-text">{player.data.baseprice}</TableCell>
      </TableRow>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(DisplayPlayer);
