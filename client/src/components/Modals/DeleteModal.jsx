import { Modal, Box, Typography, Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../Redux/slices/post.slice";

export const DeleteModal = ({ show, setShow, post }) => {
  const handleClose = () => setShow(false);
  const { status } = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(false);
  const [initialStatus, setInitialStatus] = useState(status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      setInitialStatus(status);
    }
  }, [show, status]);

  const postDelete = () => {
    setIsLoading(true);
    dispatch(deletePost(post._id));
  };

  useEffect(() => {
    if (status === "succeeded" && initialStatus !== "succeeded") {
      setIsLoading(false);
      handleClose();
    }
  }, [status, initialStatus, handleClose]);

  return (
    <Modal open={show} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Are you sure you want to delete?
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Post: {post?.title}
            </Typography>
            {post?.photo && (
              <Box sx={{ mb: 2, width: "100%", maxWidth: 300 }}>
                <img
                  src={post.photo}
                  alt=""
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={postDelete}>
                Yes
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
