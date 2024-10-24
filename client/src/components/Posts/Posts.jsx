import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { Post } from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import moment from "moment";

export const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, status, error } = useSelector((state) => state.posts);

  return !posts?.length ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
      // gap={3}
    >
      {[...posts] // Create a copy of the posts array
        .sort(
          (a, b) =>
            moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
        )
        .map((post) => (
          <Grid key={post._id} item xs={12} sm={12}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
    </Grid>
  );
};
