//imnports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import { rootRoutes } from "../routes/rootRoutes.ts";
config();

//extends
const app = express();
app.use(cors());
app.use(express.json());
app.use(`${process.env.SERVER_PREFIX}`, rootRoutes);

//start server
export const start = async () => {
  try {
    //connnect to mongoDB
    await mongoose.connect(process.env.DB_LINK);
    app.listen(process.env.SERVER_PORT, () =>
      console.log("server start success")
    );
  } catch (error) {
    console.log("server start error: " + error);
  }
};
