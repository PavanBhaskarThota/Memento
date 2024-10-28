import React, { useEffect, useState, forwardRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Slide,
} from "@mui/material";
import { Edit, LockReset, Save, Cancel } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../Redux/slices/user.slice";
import moment from "moment";

// Transition component for modal animation
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfileData } = useSelector((state) => state.user);

  // State Management
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userProfileData || {});
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user data on component mount or when `id` changes
  useEffect(() => {
    dispatch(getUserData(id));
  }, [dispatch, id]);

  // Sync editData with userProfileData changes
  useEffect(() => {
    setEditData(userProfileData || {});
  }, [userProfileData]);

  // Handler Functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saved data:", editData);
    setIsEditing(false); // Exit edit mode
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleEditMode = () => setIsEditing((prev) => !prev);
  const togglePasswordModal = () => setOpenPasswordModal((prev) => !prev);

  // Reusable function to render editable/non-editable fields
  const renderField = (label, name, type = "text") => (
    <Typography variant="h6">
      {label}:{" "}
      {isEditing ? (
        <TextField
          name={name}
          value={editData[name] || ""}
          onChange={handleInputChange}
          fullWidth
          type={type}
        />
      ) : (
        editData[name] || "N/A"
      )}
    </Typography>
  );

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        padding: 2,
      }}
    >
      <Card
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              alt={editData?.name}
              src={editData?.profilePic}
              sx={{ width: 100, height: 100 }}
            >
              {editData?.name?.[0]}
            </Avatar>
          }
          title={
            isEditing ? (
              <TextField
                name="name"
                value={editData?.name}
                onChange={handleInputChange}
                fullWidth
                autoFocus
              />
            ) : (
              <Typography variant="h4">{editData?.name}</Typography>
            )
          }
          action={
            <IconButton onClick={toggleEditMode} aria-label="Edit profile">
              {isEditing ? <Cancel /> : <Edit />}
            </IconButton>
          }
        />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>{renderField("Email", "email")}</Grid>
            <Grid item xs={12}>{renderField("About", "about", "textarea")}</Grid>
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
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LockReset />}
              onClick={togglePasswordModal}
            >
              Change Password
            </Button>
            <Button
              onClick={logoutUser}
              variant="contained"
              color="error"
              sx={{ borderRadius: "20px" }}
            >
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Password Change Dialog */}
      <Dialog
        open={openPasswordModal}
        TransitionComponent={Transition}
        onClose={togglePasswordModal}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
            <TextField
              key={field}
              label={field.replace(/([A-Z])/g, " $1").trim()}
              type="password"
              name={field}
              value={passwords[field]}
              onChange={handlePasswordChange}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePasswordModal} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              console.log("Password changed:", passwords);
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
