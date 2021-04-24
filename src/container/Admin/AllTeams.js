import {
  Button,
  TableCell,
  TableRow,
  TextField,
  withStyles,
} from "@material-ui/core";
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
  const [wage, setWage] = useState(0);
  const sendBalance = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(team.id)
      .update({
        teamBalance: balance,
        teamWage: wage,
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

        <form onSubmit={sendBalance}>
          <StyledTableCell>
            <TextField
              type="number"
              onChange={(event) => {
                event.preventDefault();
                setBalance(event.target.value);
              }}
            />
            <Button variant="contained" color="secondary" type="submit">
              Update
            </Button>
          </StyledTableCell>
          <StyledTableCell>{team.data.teamWage}</StyledTableCell>
          <StyledTableCell>
            <TextField
              type="number"
              onChange={(event) => {
                event.preventDefault();
                setWage(event.target.value);
              }}
            />
            <Button variant="contained" color="secondary" type="submit">
              Update
            </Button>
          </StyledTableCell>
        </form>
      </StyledTableRow>
    </div>
  );
};

export default AllTeams;
