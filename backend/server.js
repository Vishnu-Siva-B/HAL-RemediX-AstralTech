import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors package
dotenv.config();
import path from "path";
import dayjs from "dayjs";

import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Enable CORS
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.on("finish", () => {
    const timestamp = dayjs().format("DD/MMM/YYYY hh:mm:ss A");
    const req_ip = req.ip === "::ffff:127.0.0.1" ? "127.0.0.1" : req.ip;
    console.log(
      `${req_ip} - - [${timestamp}] "${req.method} ${req.path} ${req.httpVersion}" ${res.statusCode} -`
    );
  });
  next();
});

app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`App listening at http://localhost:${PORT}`);
});
