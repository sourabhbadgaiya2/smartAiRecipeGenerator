import express from "express";

import { Login, Logout, Register } from "../controllers/auth.controller.js";

import {
  userLoginValidation,
  userRegisterValidation,
} from "../middleware/input-validation.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", userRegisterValidation, Register);

router.post("/login", userLoginValidation, Login);

router.get("/logout", verifyToken, Logout);

export default router;
