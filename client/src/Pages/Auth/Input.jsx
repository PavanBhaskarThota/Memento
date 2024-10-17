import { TextField } from "@mui/material";
import React from "react";

export const Input = ({ label, name }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      name={name}
      onChange={handleChange}
      required
      type={type}
      fullWidth
    />
  );
};
