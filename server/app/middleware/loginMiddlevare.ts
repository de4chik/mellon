import type { IUser } from "../types/userInterface.ts";
import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel.ts";

import validator from "validator";

export const MiddlewareLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body as IUser;

  if (!userData.password || !userData.userPhoneNumber) {
    res.status(400).json({ message: "data required" });
    return;
  }

  next();
};
