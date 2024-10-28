import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import memento from "../Images/camera.png";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/slices/user.slice";
import { deepOrange } from "@mui/material/colors";

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                marginRight: "20px",
                textDecoration: "none",
              }}
              src={user.profilePic}
              component={Link}
              to={`/profile/${user.name}/${user._id}`}
            >
              {!user.profilePic && user.name?.charAt(0).toUpperCase()}
            </Avatar>
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
