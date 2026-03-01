import express from "express";
import cors from "cors";

import bugsroutes from "./routes/bugsroutes.js";
import userroutes from "./routes/userroutes.js";

import connecttoDB from "./service/connection.js";

import cookieParser from "cookie-parser";

import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT=process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/bug", bugsroutes);
app.use("/api/user/", userroutes);



app.get("/", (req, res) => {
  res.send("Hello world");
});



connecttoDB();

app.listen(PORT, () => {
  console.log("App running at ");
});
