import React, { useState, useRef, useEffect } from "react";
import useStyles from "./styles";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Loading } from "../Loading/Loading";
import { createPost, updatePost } from "../../Redux/slices/post.slice";
import CloseIcon from "@mui/icons-material/Close";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Form = ({ currentId, setCurrentId, handleClose }) => {
  const classes = useStyles();
  const fileInputRef = useRef("");
  const [loading, setLoading] = useState(false);
  const { posts, status } = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({
    title: "",
    creator: "",
    message: "",
    tags: "",
    photo: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentId) {
      const res = posts.find((post) => post._id === currentId);
      setPostData(res);
    }
  }, [currentId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPostData({ ...postData, [name]: reader.result });
        };

        reader.readAsDataURL(file);
      }
    } else if (name === "tags") {
      setPostData({ ...postData, [name]: value.split(",") });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleFileRemove = () => {
    setPostData({ ...postData, photo: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clear = () => {
    setPostData({
      title: "",
      creator: "",
      message: "",
      tags: "",
      photo: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setCurrentId(null);
  };

  const handleCloseModal = () => {
    if (currentId) {
      setCurrentId(null);
    }
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, creator, message, tags, photo } = postData;

    if (!title || !creator || !message || !tags || !photo) {
      alert("Please fill in all the fields and upload a photo.");
      return;
    }
    setLoading(true);

    const post = { ...postData };

    if (postData.photo && !currentId) {
      const data = new FormData();
      data.append("file", postData.photo);
      data.append("upload_preset", "memento");
      data.append("cloud_name", "dowxfiyte");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dowxfiyte/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const urlData = await res.json();
      post.photo = urlData.url;
    }

    if (currentId) {
      dispatch(updatePost({ id: currentId, post }));
    } else {
      dispatch(createPost(post));
    }
    clear();
    handleClose();
    setLoading(false);
  };

  return (
    <Paper className={classes.paper}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleCloseModal}
          sx={{
            m: 3,
            ml: 0,
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            minWidth: 0,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={loading}
        >
          <CloseIcon />
        </Button>
      </Box>

      <Typography variant="h5" textAlign={"center"}>
        {currentId
          ? "Editing a Memento"
          : loading
          ? "Uploading..."
          : "Create a Memento"}
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`${classes.root} ${classes.form}`}
        >
          <TextField
            name="creator"
            value={postData.creator}
            variant="outlined"
            fullWidth
            label="Creator"
            required
            onChange={handleChange}
          />
          <TextField
            name="title"
            value={postData.title}
            variant="outlined"
            fullWidth
            required
            label="Title"
            type="text"
            onChange={handleChange}
          />

          <TextField
            name="tags"
            value={postData.tags}
            variant="outlined"
            fullWidth
            required
            label="Tags, separated by commas"
            type="text"
            onChange={handleChange}
          />
          <TextField
            name="message"
            value={postData.message}
            variant="outlined"
            fullWidth
            required
            label="Description"
            multiline
            rows={4}
            onChange={handleChange}
          />

          {postData.photo ? (
            <Box className={classes.imageContainer}>
              <img
                src={postData.photo}
                alt="Uploaded preview"
                className={classes.imagePreview}
              />
              {!currentId && (
                <Box className={classes.deleteButton}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleFileRemove}
                    // startIcon={<HighlightOffIcon />}
                  >
                    <HighlightOffIcon />
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              fullWidth
              size="large"
              sx={{ backgroundColor: "#16325B" }}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                name="photo"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
              />
            </Button>
          )}

          <Button
            className={classes.buttonSubmit}
            fullWidth
            variant="contained"
            color="success"
            type="submit"
            size="large"
            sx={{ backgroundColor: "#40A578" }}
            disabled={
              !(
                postData.title &&
                postData.creator &&
                postData.message &&
                postData.tags &&
                postData.photo
              )
            }
          >
            Save Memory
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={clear}
            size="large"
            sx={{ backgroundColor: "#800000" }}
            disabled={
              !(
                postData.title ||
                postData.creator ||
                postData.message ||
                postData.tags ||
                postData.photo
              )
            }
          >
            Clear
          </Button>
        </form>
      )}
    </Paper>
  );
};
