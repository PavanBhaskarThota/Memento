import { makeStyles } from "@mui/styles";

const image1 =
  "https://res.cloudinary.com/dowxfiyte/image/upload/v1729881781/mountain_pattern2_pqmltd.jpg";
const image2 =
  "https://res.cloudinary.com/dowxfiyte/image/upload/v1729881788/mountain_pattern_zfqpsn.jpg";

export default makeStyles(() => ({
  container: {
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${image2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  formBox: {
    width: "350px",
    padding: "20px",
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    color: "white",
  },

  profilePicContainer: {
    position: "relative",
    width: 100,
    height: 100,
    margin: "0 auto 10px",
  },
}));
