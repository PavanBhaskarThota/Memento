import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

};
