import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createUserController,
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);

export default router;
