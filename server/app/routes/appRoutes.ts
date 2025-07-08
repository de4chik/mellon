import { Router } from "express";
import { routerAuth } from "./authRouter.ts";

const routerApp = Router();

routerApp.use("/auth", routerAuth);
// routerApp.use("/api", routerAuth);


export { routerApp };
