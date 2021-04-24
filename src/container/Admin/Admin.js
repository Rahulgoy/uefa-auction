import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";
import { Link, NavLink } from "react-router-dom";
import PlayerForm from "./PlayerForm";

const Admin = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Container align="center">
          <Button color="primary">
            <NavLink to="/playerform">
              <Typography variant="h6" style={{ color: "red" }}>
                Add_Player
              </Typography>
            </NavLink>
          </Button>
          <Button color="primary">
            <NavLink to="/updateplayer">
              <Typography variant="h6" style={{ color: "black" }}>
                Update_Player
              </Typography>
            </NavLink>
          </Button>
          <Button color="primary">
            <NavLink to="/updateuser">
              <Typography variant="h6" style={{ color: "red" }}>
                Update_User
              </Typography>
            </NavLink>
          </Button>
          <Button color="primary">
            <NavLink to="/signup">
              <Typography variant="h6" style={{ color: "black" }}>
                Add_User/Team
              </Typography>
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to="/playerslot">
              <Typography variant="h6" style={{ color: "red" }}>
                Player_Slot
              </Typography>
            </NavLink>
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Admin;
