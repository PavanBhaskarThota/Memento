import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: "8px",
    },
  },
  paper: {
    padding: "16px",
  },

  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },

  imagePreview: {
    maxWidth: "100%",
    objectFit: "contain",
    maxHeight: "180px",
    borderRadius: "8px",
  },

  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },

  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
  },

  buttonSubmit: {
    marginBottom: "10px",
    marginTop: "10px",
  },
}));
