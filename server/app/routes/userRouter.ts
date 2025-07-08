import { Router } from "express";

const routerUser = Router();

routerUser.get("/user/", () => {});

routerUser.delete("/user/delete", () => {});

routerUser.patch("/user/update", () => {});
