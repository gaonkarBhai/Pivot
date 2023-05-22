import express from "express";

import {
  registerController,
  loginController,
  testUser
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router(); // Router object

// Routing

// Register User -> POST
router.post("/register", registerController);
// Login User -> POST
router.post("/login", loginController);
// test -> GET
router.get("/test",requireSignIn,isAdmin, testUser);
export default router;
