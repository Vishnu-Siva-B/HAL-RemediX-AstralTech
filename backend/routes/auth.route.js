import express from "express";
export const authRouter = express.Router();
import {
  signin,
  signup,
  signout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth
} from "../controllers/auth.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

authRouter.post("/signin", signin);

authRouter.post("/signup", signup);

authRouter.post("/signout", signout);

authRouter.post("/verify-otp-email", verifyEmail);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password", resetPassword);

authRouter.get("/check-auth", verifyToken, checkAuth);
