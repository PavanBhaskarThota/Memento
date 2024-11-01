import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { Post } from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import moment from "moment";

export const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, status, hasMore, error } = useSelector((state) => state.posts);
  console.log(error);
  console.log(posts);
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
    >
      {[...posts].map((post) => (
        <Grid key={post._id} item xs={12} sm={12}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}

      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: 1,
            mb: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!hasMore && (
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign={"center"}
          width={"100%"}
          m={2}
        >
          No more Mementos
        </Typography>
      )}
    </Grid>
  );
};
