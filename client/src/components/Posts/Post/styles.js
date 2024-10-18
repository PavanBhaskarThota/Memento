import { makeStyles } from "@mui/styles";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    width: "100%",
    height: "80px",
    objectFit: "contain",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    backgroundImage:
      "linear-gradient(to right, #d7d2cc 0%, #304352 100%) !important",
    backgroundImage:
      "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%) !important",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "10px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  overlay3: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
});
