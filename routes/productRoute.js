import express from "express";
const router = express.Router();
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
  getAllProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  filterProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-product", getAllProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);

router.post("/filter-product/", filterProductController);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
