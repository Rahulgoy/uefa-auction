import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";

import { connect } from "react-redux";
import SilentBiddingHelper from "./SilentBiddingHelper";
import { Redirect } from "react-router";

import { makeStyles } from '@material-ui/core/styles';

import BlurredImage from "../../assets/img/BlurredImage.png";

import {
  Box,
  Container,
  Table,
  TableBody,  
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    
    // boxShadow: '0 3px 5px 2px white',
    
    padding: '0 30px',
  },

  container: {

    padding: 10
  },

  heading: {
    // page heading
    padding: '25px 0 0 20px'

  },
  table: {
    background: 'linear-gradient(45deg, #647DEE 30%, #7F53AC 90%)',
    color: 'white',
    border: '2px solid white',
    // borderRadius: '10px'
    

  },
  row1: {
    boxShadow:'none',

  },
  
  tableWrapper: {
    
  }
});



const SilentBidding = ({ auth, playerB }) => {
  const classes = useStyles();

  const [silentPlayers, setSilentPlayers] = useState([]);
  const [playerId, setplayerId] = useState("");

  const fetchSilent = () => {
    /* db.collection("players")
      .where("category", "==", "silent")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          console.log(doc.id, "=>", doc.data());
          setSilentPlayers((silentPlayers) => [
            ...silentPlayers,
            { id: doc.id, data: doc.data() },
          ]);
        });
      }); */

    db.collection("players")
      .where("category", "==", "silent")
      .where("status", "==", "open")
      .where("class", "==", "show")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          //console.log(doc.id, "=>", doc.data());
          setSilentPlayers((silentPlayers) => [
            ...silentPlayers,
            { id: doc.id, data: doc.data() },
          ]);
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  };

  console.log(silentPlayers);
  /* let arr = Object.entries(silentPlayers);
  console.log("Arr:", arr); */
  useEffect(() => {
    console.log("Working....");

    fetchSilent();
  }, []);
  if (!auth.uid) return <Redirect to="/signin" />;

  

  return (
<>    
  <div className={classes.root}>
    <Typography variant='h2' className={classes.heading} color='primary' align='center'>
      Silent Bidding
    </Typography>

    <Container>
      <div className={classes.wrapper}>
          {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
        <div className={classes.tableWrapper}>
      
          <TableContainer className={classes.container}>
            <Table className={classes.table} style={{borderRadius:'5px'}}>
              {/* <Box borderRadius={10} border={1} borderColor='secondary'> */}
              <TableHead stickyHeader>
                <TableRow className={classes.row1}>
                  <TableCell> <Typography color='primary'>Name</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Rus</Typography>  </TableCell>
                  <TableCell> <Typography color='primary'>Batting Avg </Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Strike Rate</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Wickets</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Bowling Avg</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Economy</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Rating</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Baseprice</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Max Bid</Typography> </TableCell>
                  <TableCell> <Typography color='primary'>Place Bid</Typography> </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                  {silentPlayers.map((player) => {
                    return player ? (
                      <SilentBiddingHelper
                        key={player.id}
                        player={player.data}
                        playerId={playerId}
                        teamId={auth.uid}
                      />
                    ) : (
                      <h3>No Player to Bid</h3>
                    );
                  })}
                </TableBody>
              {/* </Box> */}
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  </div>
</>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    playerB: state.playerB,
  };
};

export default connect(mapStateToProps)(SilentBidding);