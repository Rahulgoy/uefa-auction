import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import Categories from "./Categories";
import Players from "./Players";

///
import "../../assets/css/dashboard.css";

const PlayerSection = ({ teamId }) => {
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
            setCategories({ id: doc.id, data: doc.data().teamName });
          } else {
            setCategories((categories) => [
              ...categories,
              {
                id: doc.id,
                data: doc.data().teamName,
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
    <div>
      {categories === null ? (
        console.log("No category")
      ) : (
        <Categories filterPlayers={filterPlayers} categories={categories} />
      )}
      <Players
        players={
          filteredPlayers ? filteredPlayers : console.log("No player Available")
        }
      />
    </div>
  );
};

export default PlayerSection;
