import React, { useState } from "react";
import { Input, TextField, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "../../utlils/StateProvider";
import "./HomePage.css";

const Homepage = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useStateValue();

  const addUser = () => {
    dispatch({
      type: "ADD_USER",
      name: name,
    });
  };

  return (
    <div className="main">
      <div className="title">
        <Typography variant="h3">Welcome To LightBulb Game </Typography>
      </div>
      <div className="form">
        <TextField
          id="standard-basic"
          label="Name"
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
        />

        <Link
          onClick={(e) => (!name ? e.preventDefault() : addUser())}
          to={`/gameboard`}
        >
          <span className="start-button">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
