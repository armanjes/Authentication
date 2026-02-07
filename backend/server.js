import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { env, connectDB } from "./config/index.js";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/index.js";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.use(errorMiddleware);

async function startServer() {
  connectDB(env.MONGODB_COMPASS_URI);

  app.listen(env.PORT, () =>
    console.log(`✅ server connected to port ${env.PORT}`),
  );
}

startServer();
