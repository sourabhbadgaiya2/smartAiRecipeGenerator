import express from "express";
import { getCurrentUser, updateUser } from "../controllers/user.controller.js";
import {  verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/current-user", verifyToken, getCurrentUser);

router.put("/update-user", verifyToken, updateUser);

export default router;
