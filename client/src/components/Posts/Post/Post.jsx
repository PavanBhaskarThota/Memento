import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { DeleteModal } from "../../Modals/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../../Redux/slices/post.slice";
import toast from "react-hot-toast";

export const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    setIsLiked(post?.likeCount.some((like) => like.userId === user?._id));
  }, [post?.likeCount, user?._id]);

  const likePostByUser = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }
    dispatch(likePost(post._id));
  };

  return (
    <Card className={classes.card}>
      <Box position="relative">
        <CardMedia
          className={classes?.media}
          image={post?.photo}
          alt="https://via.placeholder.com/300x200?text=Image+Not+Available"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=Image+Not+Available";
          }}
        />
        <Box className={classes.overlay}>
          <Typography variant="h6">{post?.userName}</Typography>
          <Typography variant="body2">
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </Box>
        {user && user?._id === post?.userId && (
          <Box className={classes.overlay2}>
            <Button
              sx={{ color: "#ffff" }}
              size="large"
              onClick={() => {
                setCurrentId(post?._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </Box>
        )}
        <Box className={classes.overlay3}>
          <Typography variant="body2">
            {post?.createdAt !== post?.updatedAt &&
              `Updated ${moment(post?.updatedAt).fromNow()}`}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post?.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Box>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post?.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {post?.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Box>
          {/* <Typography variant="body2" color="textSecondary">
            Liked by{" "}
            {isLiked
              ? "you"
              : post.likeCount.length > 0 &&
                post.likeCount[post.likeCount.length - 1].userName}{" "}
            {post.likeCount.length > 1
              ? `and ${post.likeCount.length - 1} others`
              : null}
          </Typography> */}

          {post.likeCount.length > 0 && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ pl: "8px" }}
            >
              Liked by {isLiked ? "you" : post.likeCount.at(-1)?.userName}{" "}
              {post.likeCount.length > 1 &&
                `and ${post.likeCount.length - 1} others`}
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
            {post?.likeCount.length}
          </Button>
        </Box>
        {user && user?._id === post?.userId && (
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setShow(true)}
          >
            Delete
          </Button>
        )}
        <DeleteModal show={show} setShow={setShow} post={post} />
      </CardActions>
    </Card>
  );
};
