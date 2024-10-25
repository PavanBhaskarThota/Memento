import {
  Avatar,
  Box,
  Button,
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
  Card,
  CardContent,
  CardHeader,
  Grow,
} from "@mui/material";
import { Edit, LockReset, Save, Cancel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../Redux/slices/user.slice";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfileData } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userProfileData || {});
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(getUserData(id));
    setEditData(userProfileData);
  }, [userProfileData]);

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const handlePasswordModalOpen = () => setOpenPasswordModal(true);
  const handlePasswordModalClose = () => setOpenPasswordModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log("Saved data:", editData);
    setIsEditing(false);
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grow in>
        <Container maxWidth="md">
          <Card
            sx={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: 4,
              overflow: "hidden",
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
                  />
                ) : (
                  <Typography variant="h4">{editData?.name}</Typography>
                )
              }
              action={
                <IconButton onClick={toggleEditMode}>
                  {isEditing ? <Cancel /> : <Edit />}
                </IconButton>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Email:{" "}
                    {isEditing ? (
                      <TextField
                        name="email"
                        value={editData?.email}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    ) : (
                      editData?.email
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    About:{" "}
                    {isEditing ? (
                      <TextField
                        name="about"
                        value={editData?.about}
                        onChange={handleInputChange}
                        fullWidth
                        type="textarea"
                      />
                    ) : (
                      editData?.about || "N/A"
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    DOB: {/* {editData?.dateOfBirth || "N/A"} */}
                    {isEditing ? (
                      <TextField
                        name="about"
                        value={editData?.dateOfBirth}
                        onChange={handleInputChange}
                        type="date"
                        fullWidth
                      />
                    ) : (
                      editData?.dateOfBirth || "N/A"
                    )}
                  </Typography>
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
                  onClick={handlePasswordModalOpen}
                >
                  Change Password
                </Button>

                <Button
                  onClick={logoutUser}
                  variant="contained"
                  color="error"
                  sx={{ marginRight: "20px", borderRadius: "20px" }}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Dialog
            open={openPasswordModal}
            TransitionComponent={Transition}
            onClose={handlePasswordModalClose}
          >
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                fullWidth
              />
              <TextField
                label="New Password"
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                fullWidth
              />
              <TextField
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePasswordModalClose} color="error">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  console.log("Password changed:", passwords);
                  handlePasswordModalClose();
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Grow>
    </Box>
  );
};
