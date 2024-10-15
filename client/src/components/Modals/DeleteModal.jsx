import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../Redux/slices/post.slice";

export const DeleteModal = ({ show, setShow, post }) => {
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  const postDelete = () => {
    dispatch(deletePost(post._id));
    handleClose();
  };

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
        }}
      >
        <Typography variant="h6" color="error">
          Are you sure you want to delete?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Typography variant="h5">Post: {post?.title}</Typography>
          <Box sx={{ mt: 2, width: "300px" }}>
            <img
              src={post?.photo}
              alt=""
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={postDelete}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
