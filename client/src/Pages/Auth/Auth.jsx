import {
  Box,
  Button,
  Grow,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import useStyles from "./styles";
import { Input } from "./Input";

export const Auth = () => {
  const classes = useStyles();
  const [isSigned, setIsSigned] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const handleIsSigned = () => {
    setIsSigned(!isSigned);
    setUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: "",
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Box className={classes.container}>
      <Grow in timeout={500}>
        <Box className={classes.formBox}>
          <Typography variant="h4" align="center" sx={{color:'white'}}>
            {isSigned ? "Sign In" : "Sign Up"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {!isSigned && (
              <Box className={classes.profilePicContainer}>
                <Avatar
                  src={user.profilePic}
                  sx={{ width: 100, height: 100 }}
                />
                <IconButton
                  onClick={triggerFileInput}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "white",
                  }}
                >
                  <EditIcon />
                </IconButton>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
              </Box>
            )}

            {!isSigned && (
              <Input
                label="Name"
                name="name"
                type="text"
                value={user.name}
                handleChange={handleChange}
              />
            )}
            <Input
              label="Email"
              name="email"
              type="email"
              value={user.email}
              handleChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={user.password}
              handleChange={handleChange}
            />
            {!isSigned && (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
                handleChange={handleChange}
              />
            )}

            <Button variant="contained" size="large" type="submit" fullWidth sx={{ borderRadius: "20px" }}>
              {isSigned ? "Login" : "Create Account"}
            </Button>
          </form>

          <Typography align="center">
            {isSigned ? "Don't have an account? " : "Already have an account? "}
            <Button onClick={handleIsSigned} sx={{ color: "#fff" }}>
              {isSigned ? "Sign Up" : "Sign In"}
            </Button>
          </Typography>

          <Button
            component={Link}
            to="/"
            startIcon={<ReplyIcon />}
            variant="outlined"
            sx={{ borderRadius: "20px", alignSelf: "center", color: "#fff" }}
          >
            Back
          </Button>
        </Box>
      </Grow>
    </Box>
  );
};
