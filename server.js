import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

import cron from "node-cron";
import axios from "axios";

//routers
import jobRouter from "./routes/jobrouter.js";
import authRouter from "./routes/authRouter.js";
import projectRouter from "./routes/projectRouter.js";
import techstackRouter from "./routes/techstackroutes.js";
import inboxRouter from "./routes/inboxRouter.js";
import exprienceRouter from "./routes/exprienceRouter.js";
import certificationRouter from "./routes/certificationRouter.js";

//public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

//middleware
import errorHandlerMiddleware from "./middleware/errorhandlerMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "devlopment") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ msg: "Server is running!" });
});
cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get("https://aquib-ahmad.tech");
    console.log(`Health check successful: ${response.data.msg}`);
  } catch (error) {
    console.error(`Health check failed: ${error.message}`);
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/techstacks", techstackRouter);
app.use("/api/v1/inboxs", inboxRouter);
app.use("/api/v1/expriences", exprienceRouter);
app.use("/api/v1/certifications", certificationRouter);

// entry point prod...
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//not found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "route not found " });
});

//err HANDLING  middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server listening on ${port}...`);
  });
} catch (error) {
  console.log({error});
  process.exit(1);
}
