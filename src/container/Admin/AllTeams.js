import { TableCell, TableRow, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import { db } from "../../config/Firebase";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

///----------------------------Main Section---------------------------------------

const AllTeams = ({ team }) => {
  const [balance, setBalance] = useState(0);
  const sendBalance = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(team.id)
      .update({
        teamBalance: balance,
      })
      .then(console.log("Done"))
      .catch((err) => {
        console.log("Error", err);
      });
  };
  console.log(balance);
  return (
    <div>
      <StyledTableRow>
        <StyledTableCell>{team.data.teamName}</StyledTableCell>
        <StyledTableCell>{team.id}</StyledTableCell>
        <StyledTableCell>{team.data.teamBalance}</StyledTableCell>
        <StyledTableCell>
          <form onSubmit={sendBalance}>
            <input
              type="number"
              onChange={(event) => {
                event.preventDefault();
                setBalance(event.target.value);
              }}
            />
            <button type="submit">Update</button>
          </form>
        </StyledTableCell>
      </StyledTableRow>
    </div>
  );
};

export default AllTeams;
