import express from "express";

import {
  registerController,
  loginController,
  testUser,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router(); // Router object

// Routing

// Register User -> POST
router.post("/register", registerController);
// Login User -> POST
router.post("/login", loginController);
// Forgot Password -> Post
router.post("/forgot-password", forgotPasswordController);
// test -> GET
router.get("/test", requireSignIn, isAdmin, testUser);
// Protected route -> GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
