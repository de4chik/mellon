import type { Request, Response } from "express";
import type { IUser } from "../types/userInterface.ts";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.ts";
import { generateTokens } from "../utils/JWTGenerate.ts";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      //request data
      const user = req.body as IUser;

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, salt);

      //create user
      const newUser = await UserModel.create({
        ...user,
        password: hashPassword,
      });
      const userToken = generateTokens(newUser._id);
      newUser.save();

      res.status(201).json({
        message: "USER REGISTER",
        data: newUser,
        tokens: { access: userToken.access, refresh: userToken.refresh },
      });
    } catch (error) {
      res.status(500).json({ message: "user register error" });
      console.log(error);
    }
  }
  async login(req: Request, res: Response) {
    //request data
    const userData = req.body as IUser;

    //find user
    const user = await UserModel.findOne({
      userPhoneNumber: userData.userPhoneNumber,
    });

    if (!user) {
      res.status(400).json({ message: "user is not registerd" });
      return;
    }
    const validPassword = bcrypt.compareSync(userData.password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "wrong phone or password" });
      return;
    }
    const userToken = generateTokens(user._id);

    res.status(201).json({
      message: "USER REGISTER",
      data: user,
      tokens: { access: userToken.access, refresh: userToken.refresh },
    });
  }
}

export const ControllerAuth = new AuthController();
