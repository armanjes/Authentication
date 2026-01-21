import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/index.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.use(errorMiddleware);

const { PORT, MONGODB_COMPASS_URI } = process.env;

if (!PORT) throw new Error(500, "PORT not defined in environment variables");
if (!MONGODB_COMPASS_URI)
  throw new Error(500, "MongoDB URI not defined in environment variables");

mongoose
  .connect(MONGODB_COMPASS_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log("server running!"));
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
