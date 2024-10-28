import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, "pavan", (err, decoded) => {
      if (decoded) {
        req.body.userId = decoded.user._id;
        req.body.userName = decoded.user.name;
        next();
      } else {
        res.send({ message: "Unauthorized" });
      }
    });
  } else {
    res.send({ message: "Unauthorized" });
  }
};
