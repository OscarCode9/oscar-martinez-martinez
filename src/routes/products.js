import express from "express";
import {
  batchCreateProducts,
  batchDeleteProducts,
  batchUpdateProducts,
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductsByUserId,
  updateProduct,
} from "../controllers/products.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/products", getAllProducts);
router.get("/products/:userId", getProductsByUserId);
router.get("/products/:productId", getProductById);
router.post("/products", createProduct);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProductById);

//batch
router.post("/products/user/batch", batchCreateProducts);
router.put("/products/user/batch", batchUpdateProducts);
router.delete("/products/user/batch", batchDeleteProducts);

export default router;
