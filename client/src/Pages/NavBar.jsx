import { Box, Typography } from '@mui/material'
import React from 'react'
import memento from "../Images/camera.png";
import useStyles from "./styles";

export const NavBar = () => {
  const classes = useStyles();
  return (
    <Box className={classes.appBar}>
        <Typography className={classes.heading} variant="h4">
          Memento
        </Typography>
        <img className={classes.image} src={memento} alt="" />
      </Box>
  )
}
