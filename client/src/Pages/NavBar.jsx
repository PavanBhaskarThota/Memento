import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import memento from "../Images/camera.png";
import useStyles from "./styles";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.appBar}>
        <Box className={classes.title}>
          <Typography
            className={classes.heading}
            variant="h4"
            component={Link}
            to={"/"}
            sx={{ textDecoration: "none" }}
          >
            Memento
          </Typography>
          <img className={classes.image} src={memento} alt="" />
        </Box>
        <Button
          component={Link}
          to="/auth"
          variant="contained"
          sx={{ marginRight: "20px", borderRadius: "20px" }}
        >
          Sign in
        </Button>
      </Box>
      {/* <Divider /> */}
    </>
  );
};
