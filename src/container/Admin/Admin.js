import { Button } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";
import { Link, NavLink } from "react-router-dom";
import PlayerForm from "./PlayerForm";

const Admin = () => {
  return (
    <>
      <Button color="primary">
        <NavLink to="/playerform">Add Player</NavLink>
      </Button>
      <Button color="primary">
        <NavLink to="/updateplayer">Update Player</NavLink>
      </Button>
      <Button color="primary">
        <NavLink to="/updateuser">Update User</NavLink>
      </Button>
      <Button color="primary">
        <NavLink to="/signup">Add User/Team</NavLink>
      </Button>
      <Button color="inherit">
        <NavLink to="/playerslot">Player Slot</NavLink>
      </Button>
    </>
  );
};

export default Admin;
