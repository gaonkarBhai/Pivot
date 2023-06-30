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


// Forgot Password -> POST
router.post("/forgot-password", forgotPasswordController);


// Protected route -> GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected route -> GET
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// test -> GET
router.get("/test", requireSignIn, isAdmin, testUser);

export default router;
