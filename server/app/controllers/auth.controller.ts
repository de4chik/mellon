import type { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";

import type { IUserModel } from "../types/user.type";
import { ModelUser } from "../models/user.model";
import { generateJWT } from "../services/generateJWT";

class Controller {
  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body as IUserModel;
      // find user in DB
      const findUser = await ModelUser.findOne({ email });
      if (!findUser) {
        res.status(400).json({ message: "wrong email or password" });
        return;
      }

      //password check
      const verifiedPassword = await compare(password, findUser.password);
      if (!verifiedPassword) {
        res.status(400).json({ message: "wrong email or password" });
        return;
      }

      //sending to client
      const { accessToken, refreshToken } = generateJWT({
        _id: findUser._id.toString(),
      });

      res.status(200).json({
        message: "sign up success",
        data: { accessToken, refreshToken, user: findUser },
      });
    } catch (error) {
      res.status(500).send("sign in error");
    }
  }
  async signup(req: Request, res: Response) {
    try {
      const dataUser = req.body as IUserModel;

      //user availability check
      const findUser = await ModelUser.findOne({
        $or: [{ email: dataUser.email }, { uniqueName: dataUser.uniqueName }],
      });
      if (!!findUser) {
        res.status(400).json({ message: "user alredy exist" });
        return;
      }

      //create user
      const salt = await genSalt(10);
      const hashedPassword = await hash(dataUser.password, salt);
      const createUser = await ModelUser.create({
        ...dataUser,
        password: hashedPassword,
      });
      createUser.save();

      //sending to client
      const { accessToken, refreshToken } = generateJWT({
        _id: createUser._id.toString(),
      });

      res.status(200).json({
        message: "sign up success",
        data: { accessToken, refreshToken, user: createUser },
      });
    } catch (error) {
      res.status(500).send("sign up error: " + error);
    }
  }
}

export const ControllerAuth = new Controller();
