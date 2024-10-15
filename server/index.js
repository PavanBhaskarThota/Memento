import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connection } from "./Database/db.js";
import dotenv from "dotenv";
import postRoutes from "./Routes/postRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.listen(process.env.PORT || 5000, "0.0.0.0", async () => {
  try {
    console.log(`server running at ${process.env.PORT}`);
    await connection;
  } catch (error) {
    console.log(error);
  }
});
