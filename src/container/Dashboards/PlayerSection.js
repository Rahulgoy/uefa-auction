import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import Categories from "./Categories";
import Players from "./Players";

import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

///
// import "../../assets/css/dashboard.css";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.primary,
  //   background: '#555555'
  // },
  playerSectionWrapper: {
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
}));

const PlayerSection = ({ teamId }) => {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  // let categories = [];
  const [team, setTeam] = useState([]);
  const [AllPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const fetchPlayers = () => {
    console.log("Fetching Players");
    db.collection("players").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        //console.log(doc.data());
        setAllPlayers((AllPlayers) => [
          ...AllPlayers,
          { id: doc.id, data: doc.data() },
        ]);
      });
    });
  };
  const fetchTeam = () => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          if (categories === null) {
            setCategories({ id: doc.id, data: doc.data().initials });
          } else {
            setCategories((categories) => [
              ...categories,
              {
                id: doc.id,
                data: doc.data().initials,
              },
            ]);
          }
        });

        /* const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      result.map((res) => {
        console.log(res.data);
        // categories.push([res.data.teamName]);
      }); */
      });
  };
  const fetchDefault = () => {
    console.log("Fetching Players");
    db.collection("players").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        //console.log(doc.data());
        if (doc.data().team === teamId)
          setFilteredPlayers((filteredPlayers) => [
            ...filteredPlayers,
            { id: doc.id, data: doc.data() },
          ]);
      });
    });
  };

  const filterPlayers = (category, id) => {
    //console.log("C", id);

    const filterPlayers = AllPlayers.filter(
      (player) => player.data.team === id
    );
    setFilteredPlayers(filterPlayers);
  };
  //console.log(AllPlayers);

  useEffect(() => {
    fetchTeam();
    fetchPlayers();
    fetchDefault();
  }, []);

  console.log(filteredPlayers);
  return (
    <Grid className={classes.playerSectionWrapper}>
      <Grid item xs={12}>
        <div
          classes={classes.containerButton}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {categories === null ? (
            console.log("No category")
          ) : (
            <Categories
              filterPlayers={filterPlayers}
              className="teamDisplayButton"
              categories={categories}
            />
          )}
        </div>
      </Grid>

      <Grid item xs={12}>
        <Players
          players={
            filteredPlayers
              ? filteredPlayers
              : console.log("No player Available")
          }
        />
      </Grid>
    </Grid>
  );
};

export default PlayerSection;
