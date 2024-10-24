import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  appBar: {
    width: "100%",
    // marginBottom: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    // boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    backgroundColor: "white",
    backgroundColor:'black',
    backgroundImage: 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
  },
  heading: {
    color: "#227B94",
    paddingLeft: "10px",
  },
  image: {
    marginLeft: "10px",
    width: "50px",
    display: "inline-block",
  },

  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
