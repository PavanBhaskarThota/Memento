import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  appBar: {
    width: "100%",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:"10px 0",
    boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px',
    backgroundColor: "white",
  },
  heading: {
    color: "#227B94",
    paddingLeft: "20px",
  },
  image: {
    marginLeft: "15px",
    width: "70px",
    display: "inline-block",
    paddingRight: "20px",
  },
}));
