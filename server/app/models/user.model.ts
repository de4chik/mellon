import { Schema, model } from "mongoose";
import type { IUserModel } from "../types/user.type";

const Model = new Schema<IUserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uniqueName: { type: String, required: true, unique: true },
});

export const ModelUser = model("User", Model);
