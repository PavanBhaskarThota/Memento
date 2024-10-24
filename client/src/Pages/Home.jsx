import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Grow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useStyles from "./styles";
import { Posts } from "../components/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/slices/post.slice";
import { FormModal } from "../components/Modals/FormModal";
import { Form } from "../components/Form/Form";
import { useTheme } from "@mui/material/styles";
import { getUser } from "../Redux/slices/user.slice";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";

export const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) dispatch(getUser());
  }, [user, dispatch]);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (currentId && isMobile) setShow(true);
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        width: "100%",
        padding: 0,
        margin: 0,
        backgroundColor: "black",
        paddingTop: "30px",
        backgroundImage: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
      }}
    >
      <Grow in>
        <Container>
          {isMobile && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={() => setShow(true)}
                variant="contained"
                sx={{ mb: 2, borderRadius: "20px" }}
                color="success"
              >
                Add New Memento +
              </Button>
            </Box>
          )}
          <FormModal
            show={show}
            handleClose={handleClose}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
          <Grid container spacing={3}>
            {!isMobile && (
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    position: "sticky",
                    top: "10px",
                    minHeight: "200px",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  {user ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        src={user.profilePic}
                      >
                        {!user.profilePic && user.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography
                        sx={{
                          marginRight: "20px",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          color: "black",
                        }}
                        variant="h6"
                        component={Link}
                        to={`/profile/${user.name.split(" ").join("_")}/${
                          user._id
                        }`}
                      >
                        {user?.name}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography>
                      Please login to share your mementos and like and comment
                      on others
                    </Typography>
                  )}
                </Box>
              </Grid>
            )}
            <Grid item xs={12} md={5}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    position: "sticky",
                    top: "10px",
                  }}
                >
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
