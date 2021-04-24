import { Button, Container } from "@material-ui/core";
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
  const [Wage, setWage] = useState(0);
  const sendWage = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(team.id)
      .update({
        teamWage: Wage,
      })
      .then(console.log("Done"))
      .catch((err) => {
        console.log("Error", err);
      });
  };
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
      <Container>
        <TableRow style={{ background: "#F19D56" }}>
          <StyledTableCell>{team.data.teamName}</StyledTableCell>
          <StyledTableCell>{team.id}</StyledTableCell>
          <StyledTableCell>{team.data.teamWage}</StyledTableCell>
          <StyledTableCell>
            <form onSubmit={sendWage}>
              <input
                type="number"
                onChange={(event) => {
                  event.preventDefault();
                  setWage(event.target.value);
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{
                  border: "1px solid black",
                }}
                type="submit"
              >
                Update
              </Button>
            </form>
          </StyledTableCell>
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
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{
                  border: "1px solid black",
                }}
                type="submit"
              >
                Update
              </Button>
            </form>
          </StyledTableCell>
        </TableRow>
      </Container>
    </div>
  );
};

export default AllTeams;
