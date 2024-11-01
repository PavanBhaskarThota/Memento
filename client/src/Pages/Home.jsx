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
import { getPosts, incrementPage } from "../Redux/slices/post.slice";
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
  const {
    posts,
    hasMore,
    page: currentPage,
  } = useSelector((state) => state.posts);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (currentId && isMobile) {
      setShow(true);
    }
  }, [currentId, isMobile]);

  // useEffect(() => {
  //   if (currentPage === 1 && posts.length === 0) {
  //     dispatch(getPosts({ currentPage }));
  //   }
  // }, [dispatch, currentPage]);

  // useEffect(() => {
  //   window.onscroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //         document.documentElement.offsetHeight - 10 &&
  //       hasMore
  //     ) {
  //       dispatch(incrementPage());
  //       dispatch(getPosts({ page: currentPage + 1 }));
  //     }
  //   };
  //   return () => (window.onscroll = null);
  // }, [dispatch, currentPage, hasMore]);

  // Remove this line: const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentPage === 1 && posts.length === 0) {
      dispatch(getPosts({ page: currentPage }));
    }
  }, [dispatch, currentPage, posts.length, posts]);

  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.offsetHeight - 10 &&
        hasMore
      ) {
        dispatch(incrementPage());
        dispatch(getPosts({ page: currentPage + 1 }));
      }
    };
    return () => (window.onscroll = null); // Clean up on unmount
  }, [dispatch, currentPage, hasMore]);

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
          {isMobile && user && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={() => setShow(true)}
                variant="contained"
                sx={{ mb: 2, borderRadius: "5px" }}
                color="primary"
              >
                Add Memento +
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
              <Grid item xs={12} lg={3}>
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
                        to={`/profile/${user.name}/${user._id}`}
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
                  <Box
                    sx={{
                      marginTop: "20px",
                      bgcolor: "white",
                      borderRadius: "10px",
                      padding: "20px",
                      boxShadow: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        marginBottom: "10px",
                      }}
                    >
                      Mementos App Features and Upcoming Updates
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", marginBottom: "8px" }}
                    >
                      Current Features:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Users can create, update, and delete their mementos
                      (only for logged-in users).
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Users can like any memento available on the app.
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Users can comment on mementos and reply to existing
                      comments.
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Users can update their profile, including profile
                      picture, bio, and date of birth.
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        marginTop: "20px",
                        marginBottom: "8px",
                      }}
                    >
                      Upcoming Updates:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Enhanced notification system for new comments, likes,
                      and replies.
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Improved search and filter options to easily find
                      mementos.
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Additional customization options for user profiles.
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      • Users will be able to view and manage all their posted
                      and liked mementos directly from their profile.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
            <Grid item xs={12} md={5}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={4}>
                {user ? (
                  <Box
                    sx={{
                      position: "sticky",
                      top: "10px",
                    }}
                  >
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                  </Box>
                ) : (
                  <Typography>
                    Please login to share your mementos and like and comment on
                    others
                  </Typography>
                )}
                <Box
                  sx={{
                    marginTop: "20px",
                    bgcolor: "white",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      marginBottom: "10px",
                    }}
                  >
                    Exciting new features are on the way for the Mementos app!
                    Stay tuned as we enhance your experience with more
                    functionality and improvements designed to make sharing and
                    managing your memories even more enjoyable.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
