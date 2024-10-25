import React, { useState } from "react";
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { DeleteModal } from "../../Modals/DeleteModal";

export const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

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
          <Typography variant="h6">{post?.creator}</Typography>
          <Typography variant="body2">
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </Box>
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
        <Button size="small" color="primary" startIcon={<ThumbUpIcon />}>
          Like {post?.likeCount}
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setShow(true)}
        >
          Delete
        </Button>
        <DeleteModal show={show} setShow={setShow} post={post} />
      </CardActions>
    </Card>
  );
};
