import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPostById, likePost } from "../../Redux/slices/post.slice";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import moment from "moment";
import toast from "react-hot-toast";
import { getUser } from "../../Redux/slices/user.slice";
import { Comments } from "./Comments";

export const SinglePostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlePostData ,status} = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    setIsLiked(
      singlePostData?.likeCount.some((like) => like.userId === user?._id)
    );
  }, [singlePostData?.likeCount, user?._id]);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  const likePostByUser = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    } else {
      dispatch(likePost(singlePostData._id));
      dispatch(getPostById(id));
    }
  };

  if(status === "loading"){
    return(
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          backgroundImage: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        pt: 2,
        minHeight: "100dvh",
        alignItems: "center",
      }}
    >
      <Grow in timeout={500}>
        <Container>
          {singlePostData && (
            <Grid
              container
              spacing={1}
              pt={2}
              borderRadius={5}
              backgroundColor="white"
              // width={"90%"}
              // mx="auto"
            >
              <Grid item xs={12} md={8}>
                <img
                  alt={singlePostData?.userName}
                  src={singlePostData?.photo}
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    maxHeight: 500,
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} gap={4} mb={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                    backgroundColor: "white",
                    p: 2,
                    borderRadius: 5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>
                        {singlePostData?.userName}
                      </span>{" "}
                      created{" "}
                    </Typography>
                    <Typography>
                      {moment(singlePostData?.createdAt).fromNow()}
                    </Typography>
                  </Box>
                  <Typography variant="h4"> {singlePostData?.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {singlePostData?.tags.map((tag, index) => (
                      <Button
                        key={index}
                        sx={{
                          m: 0,
                          bgcolor: "#EEEEEE",
                          color: "black",
                          borderRadius: 20,
                          textSizeAdjust: "small",
                        }}
                      >{`#${tag}`}</Button>
                    ))}
                  </Box>
                  <Typography> {singlePostData?.message}</Typography>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      {singlePostData.likeCount.length > 0 && (
                        <Typography variant="body2" color="textSecondary">
                          Liked by{" "}
                          {isLiked
                            ? "you"
                            : singlePostData.likeCount
                                .at(-1)
                                ?.userName.trim()
                                .split(" ")[0]}{" "}
                          {singlePostData.likeCount.length > 1 &&
                            `and ${singlePostData.likeCount.length - 1} others`}
                        </Typography>
                      )}

                      <Button
                        size="small"
                        onClick={likePostByUser}
                        sx={{ color: isLiked ? "#C63C51" : "black" }}
                        startIcon={
                          isLiked ? (
                            <FavoriteIcon sx={{ color: "#C63C51" }} />
                          ) : (
                            <FavoriteBorderIcon />
                          )
                        }
                      >
                        {singlePostData?.likeCount.length}
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        onClick={() => setOpenDialog(true)}
                      >
                        Comment
                      </Button>
                    </Box>
                  </Box>
                  <Typography>Liked By</Typography>
                  <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                    <Box>
                      {singlePostData.likeCount.map((like, i) => (
                        <Box key={i}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              padding: 2,
                              alignItems: "center",
                            }}
                          >
                            <Avatar alt={like.userName} src={like?.avatar} />
                            <Typography
                              sx={{
                                color:
                                  user?._id === like.userId
                                    ? "#C63C51"
                                    : "#1976d2",
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                              component={Link}
                              to={`/profile/${like.userName}/${like.userId}`}
                            >
                              {like.userName}
                            </Typography>
                          </Box>
                          <Divider />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    {singlePostData?.comments && (
                      <>
                        <Typography variant="h6">Recent Comments</Typography>
                        <Box
                          sx={{
                            maxHeight: 300,
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {singlePostData?.comments
                            .slice(0, 3)
                            .map((comment, i) => (
                              <>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                  <Avatar
                                    alt={comment?.userName}
                                    src={comment?.avatar}
                                  />
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Typography>{comment?.userName}</Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      {comment?.comment}
                                    </Typography>
                                  </Box>
                                  <Divider />
                                </Box>
                              </>
                            ))}
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
      </Grow>

      <Comments open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
};
