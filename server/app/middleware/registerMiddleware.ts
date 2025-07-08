import type { IUser } from "../types/userInterface.ts";
import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel.ts";

import validator from "validator";

export const MiddlewareRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body as IUser;

  // existing user
  const existingByName = await UserModel.findOne({
    userUniqueName: userData.userUniqueName,
  });
  const existingByPhone = await UserModel.findOne({
    userPhoneNumber: userData.userPhoneNumber,
  });
  if (existingByName) {
    res.status(400).json({ message: "THIS NAME ALREDY EXIST" });
    return;
  }
  if (existingByPhone) {
    res.status(400).json({ message: "THIS PHONE ALREDY EXIST" });
    return;
  }
  //check data user
  if (!userData) {
    res.status(400).json({ message: "data required" });
    return;
  } else if (
    validator.isEmpty(userData.name) ||
    validator.isEmpty(userData.password) ||
    validator.isEmpty(userData.userUniqueName) ||
    validator.isEmpty(userData.userPhoneNumber)
  ) {
    res.status(400).json({ message: "data required" });
    return;
  } else if (!validator.isMobilePhone(userData.userPhoneNumber)) {
    res.status(400).json({ message: "Phon number is not correct" });
    return;
  }

  next();
};
