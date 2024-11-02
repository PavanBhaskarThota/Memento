import React, { useEffect, useState, forwardRef, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Slide,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { Edit, LockReset, Save, Cancel } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUserData,
  isUserNameTaken,
  logout,
  updateUserData,
} from "../Redux/slices/user.slice";
import moment from "moment";
import { resetPosts } from "../Redux/slices/post.slice";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { compressImage } from "../helpers/fileCompress";
import toast from "react-hot-toast";

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userProfileData, userNameTaken, status } = useSelector(
    (state) => state.user
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userProfileData || {});
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const fileInputRef = useRef(editData.profilePic || null);
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getUserData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!user) dispatch(getUser());
  }, [user]);

  useEffect(() => {
    setEditData(userProfileData || {});
  }, [userProfileData]);

  useEffect(() => {
    setIsNameTaken(userNameTaken);
  }, [userNameTaken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    if (name === "name") {
      if (value.length > 0 && value.trim() !== user.name.trim()) {
        dispatch(isUserNameTaken(value));
      }
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (isNameTaken) {
      toast.error("Name already taken");
      return;
    }
    const userData = { ...editData };
    if (editData.profilePic && !editData.profilePic.includes("cloudinary")) {
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
    dispatch(updateUserData({ id, data: userData }));

    setIsEditing(false);
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(resetPosts());
    navigate("/");
  };

  const clear = () => {
    setEditData((prev) => ({ ...prev, profilePic: "" }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file).then((compressed) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditData((prev) => ({ ...prev, profilePic: reader.result }));
        };
        reader.readAsDataURL(compressed);
      });
    }
  };

  if (!user) {
    return <CircularProgress />;
  }

  const toggleEditMode = () => setIsEditing((prev) => !prev);
  const togglePasswordModal = () => setOpenPasswordModal((prev) => !prev);

  const renderField = (label, name, type = "text", rows = 1) => (
    <Typography variant="h6">
      {label}:{" "}
      {isEditing && name !== "email" ? (
        <TextField
          name={name}
          value={
            name === "dateOfBirth"
              ? moment(editData[name]).format("YYYY-MM-DD") // Format for date input
              : editData[name] || ""
          }
          onChange={handleInputChange}
          fullWidth
          type={type}
          rows={rows}
        />
      ) : name === "dateOfBirth" && editData[name] ? (
        moment(editData[name]).format("LL")
      ) : (
        editData[name] || "N/A"
      )}
    </Typography>
  );

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          width: "100%",
          backgroundImage:
            "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        display: "flex",
        minHeight: "90dvh",
        width: "100%",
      }}
    >
      <Card
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          width: "90%",
          margin: "0 auto",
        }}
      >
        <CardHeader
          avatar={
            <Box
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                margin: "0 auto 10px",
              }}
            >
              <Avatar
                alt={editData?.name}
                src={editData?.profilePic}
                sx={{ width: 100, height: 100 }}
              >
                {editData?.name?.[0]}
              </Avatar>
              {isEditing ? (
                editData.profilePic ? (
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
                )
              ) : null}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleProfilePicChange}
              />
            </Box>
          }
          title={
            // isEditing ? (
            //   <TextField
            //     name="name"
            //     value={editData?.name}
            //     onChange={handleInputChange}
            //     fullWidth
            //     autoFocus
            //     helperText={isNameTaken ? "Name already taken" : ""}
            //   />
            // ) : (
            <Typography variant="h4">{editData?.name}</Typography>
            // )
          }
          action={
            user._id === editData._id && (
              <IconButton onClick={toggleEditMode} aria-label="Edit profile">
                {isEditing ? <Cancel /> : <Edit />}
              </IconButton>
            )
          }
        />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {renderField("Email", "email")}
            </Grid>
            <Grid item xs={12}>
              {renderField("About", "about", "textarea", 4)}
            </Grid>
            <Grid item xs={12} md={6}>
              {renderField("DOB", "dateOfBirth", "date")}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                Created On: {moment(editData?.createdAt).format("LL")}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
            {isEditing && (
              <Button
                variant="contained"
                color="success"
                startIcon={<Save />}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            )}
            {/* {!isEditing && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LockReset />},
                onClick={togglePasswordModal}
              >
                Change Password
              </Button>
            )} */}
            {!isEditing && (
              <Button
                onClick={logoutUser}
                variant="contained"
                color="error"
                sx={{ borderRadius: "20px" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </CardContent>
        <Divider />
        {/* <TabContext value={value}> */}
        <Tabs>
          <Tab label="Posts" value={1} />
          <Tab label="Likes" value={2} />
        </Tabs>
        {/* <TabPanel value={1}>Posts</TabPanel>
          <TabPanel value={2}>Likes</TabPanel> */}
        {/* </TabContext> */}
      </Card>

      <Dialog
        open={openPasswordModal}
        TransitionComponent={Transition}
        onClose={togglePasswordModal}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field) => (
              <TextField
                key={field}
                label={field.replace(/([A-Z])/g, " $1").trim()}
                type="password"
                name={field}
                value={passwords[field]}
                onChange={handlePasswordChange}
                fullWidth
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePasswordModal} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              togglePasswordModal();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
