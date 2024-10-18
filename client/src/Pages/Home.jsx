import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Grid, Grow, Typography } from "@mui/material";
import useStyles from "./styles";
import { Posts } from "../components/Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../Redux/slices/post.slice";
import { FormModal } from "../components/Modals/FormModal";

export const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (currentId) setShow(true);
    dispatch(getPosts());
  }, [currentId, dispatch]);

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
        backgroundImage: 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)'
      }}
    >
      <Grow in>
        <Container>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => setShow(true)}
              variant="contained"
              sx={{ mb: 2, borderRadius: "20px" }}
              color="success"
            >
              Add New Memento +
            </Button>
          </Box>

          <FormModal
            show={show}
            handleClose={handleClose}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />

          <Posts currentId={currentId} setCurrentId={setCurrentId} />
        </Container>
      </Grow>
    </Container>
  );
};
