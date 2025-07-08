import { Router } from "express";
import { ControllerAuth } from "../controller/authController.ts";
import { MiddlewareRegister } from "../middleware/registerMiddleware.ts";
import { MiddlewareLogin } from "../middleware/loginMiddlevare.ts";

const routerAuth = Router();

routerAuth.post("/register", MiddlewareRegister, ControllerAuth.register);
routerAuth.post("/login", MiddlewareLogin, ControllerAuth.login);

export { routerAuth };
