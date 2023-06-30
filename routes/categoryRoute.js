import express from "express";
const router = express.Router();
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} from "./../controllers/categoryController.js";

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
router.get("/get-category", getAllCategoryController);
router.get("/get-category/:slug", getSingleCategoryController);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
