import { Box, Button, Grow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import useStyles from "./styles";
import { Input } from "./Input";

export const Auth = () => {
  const classes = useStyles();
  const [isSigned, setIsSigned] = useState(true);

  return (
    <Box className={classes.container}>
      <Grow in timeout={500}>
        <Box className={classes.formBox}>
          <Typography variant="h4" align="center">
            {isSigned ? "Sign In" : "Sign Up"}
          </Typography>
          <form className={classes.form}>
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />

            {!isSigned && (
              <>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="password"
                />
                <TextField variant="outlined" fullWidth />
              </>
            )}

            <Button variant="contained" size="large" fullWidth>
              {isSigned ? "Login" : "Create Account"}
            </Button>
          </form>

          <Typography align="center">
            {isSigned ? "Don't have an account? " : "Already have an account? "}
            <Button
              onClick={() => setIsSigned((prev) => !prev)}
              sx={{ color: "#ffff" }}
            >
              {isSigned ? "Sign Up" : "Sign In"}
            </Button>
          </Typography>

          <Button
            component={Link}
            to="/"
            startIcon={<ReplyIcon />}
            variant="outlined"
            sx={{ borderRadius: "20px", alignSelf: "center", color: "#ffff" }}
          >
            Back
          </Button>
        </Box>
      </Grow>
    </Box>
  );
};
