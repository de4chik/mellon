import express from "express";
import { ControllerAuth } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signin", ControllerAuth.signin);
router.post("/signup", ControllerAuth.signup);

export const authRoutes = router;
