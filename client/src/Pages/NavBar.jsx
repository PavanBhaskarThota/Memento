import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import memento from "../Images/camera.png";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../Redux/slices/user.slice";

export const NavBar = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user]);
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
        {user ? (
          <Box >
            {/* <Typography
              sx={{
                marginRight: "20px",
                textTransform: "uppercase",
                color: "white",
              }}
              variant="h5"
            >
              {user?.name}
            </Typography> */}
            <Button
              onClick={() => dispatch(logout())}
              variant="contained"
              color="error"
              sx={{ marginRight: "20px", borderRadius: "20px" }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            sx={{ marginRight: "20px", borderRadius: "20px" }}
          >
            Sign in
          </Button>
        )}
      </Box>
      {/* <Divider /> */}
    </>
  );
};
