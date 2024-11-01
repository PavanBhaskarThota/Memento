import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  List,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../Redux/slices/post.slice";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Comments = ({ open, onClose }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [targetCommentId, setTargetCommentId] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState({});
  const inputRef = useRef(null);
  const { singlePostData } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!comment) return;
    const payload = targetCommentId
      ? { reply: comment, commentId: targetCommentId.id }
      : { comment };

    dispatch(updateComment({ id: singlePostData._id, data: payload }));
    setComment("");
    setTargetCommentId(null);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const toggleReplies = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const getShortTimeAgo = (date) => {
    const duration = moment.duration(moment().diff(date));
    const seconds = Math.floor(duration.asSeconds());
    const minutes = Math.floor(duration.asMinutes());
    const hours = Math.floor(duration.asHours());
    const days = Math.floor(duration.asDays());
    const months = Math.floor(duration.asMonths());
    const years = Math.floor(duration.asYears());

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
  };

  useEffect(() => {
    if (singlePostData && singlePostData.comments) {
      setComments(singlePostData.comments);
    } else {
      setComments([]);
    }
  }, [singlePostData]);

  useEffect(() => {
    if (targetCommentId) inputRef.current.focus();
  }, [targetCommentId]);

  const handleClose = () => {
    setComment("");
    setTargetCommentId(null);
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", bgcolor: "background.paper" }}>
        <Toolbar>
          <Typography sx={{ ml: 1, flex: 1, color: "black" }} variant="h6">
            Comments
          </Typography>
          <IconButton edge="start" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          p: 2,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {comments.length > 0 ? (
          <List sx={{ overflow: "auto" }}>
            {comments.map((comment) => (
              <Box key={comment._id} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Avatar
                    alt={comment.userName}
                    sx={{ width: 30, height: 30 }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {comment.userName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {getShortTimeAgo(comment.createdAt)}
                      </Typography>
                    </Box>
                    <Typography>{comment.comment}</Typography>
                  </Box>
                </Box>

                {comment?.replies?.length > 0 && (
                  <Button
                    size="small"
                    onClick={() => toggleReplies(comment._id)}
                    sx={{
                      textTransform: "none",
                      ml: 6,
                      cursor: "pointer",
                    }}
                    color="textSecondary"
                  >
                    {visibleReplies[comment._id]
                      ? "Hide Replies"
                      : `Show ${comment.replies.length} Replies `}
                  </Button>
                )}
                {visibleReplies[comment._id] &&
                  comment.replies?.map((reply) => (
                    <Box key={reply._id} sx={{ pl: 6, mt: 1 }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Avatar
                          alt={reply.userName}
                          sx={{ width: 25, height: 25 }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              {reply.userName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {getShortTimeAgo(reply.createdAt)}
                            </Typography>
                          </Box>
                          <Typography>{reply.reply}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}

                <Button
                  size="small"
                  onClick={() =>
                    setTargetCommentId({
                      id: comment._id,
                      Name: comment.userName,
                    })
                  }
                  sx={{ textTransform: "none", ml: 6 }}
                >
                  Reply
                </Button>
              </Box>
            ))}
          </List>
        ) : (
          <Typography sx={{ textAlign: "center", mb: "30px" }}>
            No comments yet
          </Typography>
        )}
        {targetCommentId && (
          <Box>
            <Chip
              label={`replying to @${targetCommentId.Name}`}
              onDelete={() => setTargetCommentId("")}
            />
          </Box>
        )}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <input
            type="text"
            value={comment}
            autoFocus
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
            placeholder={
              targetCommentId ? "Reply to comment..." : "Add a comment..."
            }
            ref={inputRef}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ddd",
              height: 40,
            }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
