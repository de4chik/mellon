import { model, Schema } from "mongoose";
import type { IUser } from "../types/userInterface";

const UserShema = new Schema<IUser>({
  name: { type: String, required: true },
  birthday: { type: String },
  password: { type: String, required: true },
  userAvatars: { type: String },
  userDescription: { type: String },
  userPhoneNumber: { type: String, required: true },
  userUniqueName: { type: String, required: true },
});

export const UserModel = model("User", UserShema);
