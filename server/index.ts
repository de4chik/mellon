import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { routerApp } from "./app/routes/appRoutes.ts";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//server start
const start = async () => {
  try {
    //connect with mongoDB
    await mongoose
      .connect(
        `${process.env.DB_HOST}${process.env.DB_PORT}/${process.env.DB_NAME}`
      )
      .then(async () => {
        app.listen(process.env.SERVER_PORT, () =>
          console.log("server started")
        );
        app.use("/api", routerApp);
      })
      .catch((err) => console.log("server started error: " + err));
  } catch (error) {
    console.log(error);
  }
};

start();
