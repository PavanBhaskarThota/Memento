import {
  Box,
  Button,
  Grow,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import useStyles from "./styles";
import { Input } from "./Input";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  isUserNameTaken,
  loginUser,
} from "../../Redux/slices/user.slice";
import toast from "react-hot-toast";
import { compressImage } from "../../helpers/fileCompress";

const userData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePic: "",
};

export const Auth = () => {
  const classes = useStyles();
  const [isSigned, setIsSigned] = useState(true);
  const dispatch = useDispatch();
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [user, setUser] = useState(userData);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const isAuthenticated = !!localStorage.getItem("token");

  const { userNameTaken, status } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "name") {
      if (value.length > 0) {
        dispatch(isUserNameTaken(value));
      }
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      compressImage(file)
        .then((compressed) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUser((prev) => ({ ...prev, profilePic: reader.result }));
          };
          reader.readAsDataURL(compressed);
        })
        .catch((err) => console.error("Image compression failed:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSigned && user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isSigned && isNameTaken) {
      toast.error("Name already taken");
      return;
    }
    const userData = { ...user };

    if (userData.profilePic) {
      const data = new FormData();
      data.append("file", userData.profilePic);
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_KEY);
      data.append("cloud_name", process.env.REACT_APP_CLOUD_API_KEY);

      const res = await fetch(
        process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
        {
          method: "post",
          body: data,
        }
      );

      const urlData = await res.json();
      userData.profilePic = urlData.url;
    }

    if (isSigned) {
      dispatch(loginUser(userData));
      return;
    }
    dispatch(createUser(userData));
  };

  const handleIsSigned = () => {
    setIsSigned(!isSigned);
    setUser(userData);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clear = () => {
    setUser((prev) => ({ ...prev, profilePic: "" }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setIsNameTaken(userNameTaken);
  }, [userNameTaken]);

  useEffect(() => {
    if (status === "succeeded" && isAuthenticated) {
      navigate("/");
    }
  }, [status, isAuthenticated, navigate]);


  return (
    <Box className={classes.container}>
      <Grow in timeout={500}>
        {status === "loading" ? (
          <CircularProgress />
        ) : (
          <Box className={classes.formBox}>
            <Typography variant="h4" align="center" sx={{ color: "white" }}>
              {isSigned ? "Sign In" : "Sign Up"}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              {!isSigned && (
                <Box className={classes.profilePicContainer}>
                  <Avatar
                    src={user.profilePic}
                    sx={{ width: 100, height: 100 }}
                  />
                  {user.profilePic ? (
                    <IconButton
                      onClick={clear}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "white",
                        color: "red",
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : (
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
                  )}
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
                  isNameTaken={isNameTaken}
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
                type={showPassword ? "text" : "password"}
                value={user.password}
                handleChange={handleChange}
                handleClickShowPassword={handleClickShowPassword}
              />
              {!isSigned && (
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={user.confirmPassword}
                  handleChange={handleChange}
                />
              )}

              <Button
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                sx={{ borderRadius: "20px" }}
              >
                {isSigned ? "Login" : "Create Account"}
              </Button>
            </form>

            <Typography align="center">
              {isSigned
                ? "Don't have an account? "
                : "Already have an account? "}
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
              onClick={() => setIsNameTaken(false)}
            >
              Back
            </Button>
          </Box>
        )}
      </Grow>
    </Box>
  );
};
