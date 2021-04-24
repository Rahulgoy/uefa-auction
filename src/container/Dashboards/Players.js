import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  Button,
  Container,
  Grid,
  Typography,
  TableRow,
  TextField,
  TableBody,
  TableContainer,
  Table,
  Box,
  TableHead,
} from "@material-ui/core";
import DisplayPlayer from "./DisplayPlayer";
const StyledTableCell = withStyles((theme) => ({}))(TableCell);
const StyledTableRow = withStyles((theme) => ({}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow: '0 3px 5px 2px white',

    padding: "0 30px",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },

  table: {
    background: "linear-gradient(45deg, #647DEE 30%, #7F53AC 90%)",
    color: "white",
  },
  row1: {
    boxShadow: "none",
  },

  tableWrapper: {
    width: "100%",
  },
}));

const Players = ({ players }) => {
  const classes = useStyles();
  //console.log("length", players.length);
  if (players.length < 1) {
    return (
      <Typography variant="h5" color="primary" align="center">
        No Players Available
      </Typography>
    );
  }
  return (
    <Container>
      <div className={classes.root}>
        <TableContainer className={classes.container}>
          <Table className={classes.table}>
            {/* <Box borderRadius={10} border={1} borderColor="secondary"> */}
            <TableHead>
              <TableRow className={classes.row1}>
                <TableCell>
                  {" "}
                  <Typography color="primary">Name </Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography color="primary">Rating </Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography color="primary">Wage </Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography color="primary">Highest Bid</Typography>{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography color="primary">Base Price </Typography>{" "}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {players.map((player) => {
                return <DisplayPlayer key={player.id} player={player} />;
              })}
            </TableBody>
            {/* </Box> */}
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default Players;
