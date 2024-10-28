import { InputAdornment, TextField, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

export const Input = ({
  label,
  name,
  handleChange,
  type,
  value,
  isNameTaken,
  handleClickShowPassword,
}) => {
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
      helperText={isNameTaken && name === "name" ? "Name already taken" : ""}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {type === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
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
