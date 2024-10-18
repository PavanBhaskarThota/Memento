import { TextField } from "@mui/material";
import React from "react";

export const Input = ({ label, name, handleChange, type, value }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      name={name}
      onChange={handleChange}
      required
      value={value}
      type={type}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "black",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiInputLabel-root": {
          color: "black",
        },
        "&:hover .MuiInputLabel-root": {
          color: "white",
        },
        "& .Mui-focused .MuiInputLabel-root": {
          color: "white",
        },
      }}
    />
  );
};
