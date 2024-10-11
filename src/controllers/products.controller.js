import { productSchema } from "../models/validatorSchema/products.validator.js";
import {
  batchCreateProductsService,
  batchDeleteProductsService,
  batchUpdateProductsService,
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  getProductsByUserIdService,
  updateProductService,
} from "../services/products.services.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const products = await getProductsByUserIdService({ userId });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await getProductByIdService({ productId });
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    let productData = req.body;
    productData = { ...productData, userId: req.userId };

    const { error } = productSchema.validate(productData);
    if (error) {
      throw error;
    }

    const product = await createProductService({ ...productData });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params; // Get product ID from URL parameters

    if (!productId) {
      throw new Error("Product ID is required");
    }

    const { name, description, height, length, width } = req.body;

    const productData = {
      name,
      description,
      height,
      length,
      width,
      userId: req.userId,
    };

    const { error } = productSchema.validate(productData);
    if (error) {
      throw error;
    }

    let product = await getProductByIdService(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    await updateProductService(productId, productData);

    product = await getProductByIdService(productId);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      throw new Error("Product ID is required");
    }
    await deleteProductService(productId);

    res
      .status(200)
      .json({ message: "Product deleted successfully", productId });
  } catch (error) {
    next(error);
  }
};

export const batchCreateProducts = async (req, res, next) => {
  try {
    let products = req.body;

    if (!Array.isArray(products)) {
      throw new Error("Input must be an array of products");
    }

    const validationErrors = products
      .map((product) => {
        const { error } = productSchema.validate(product);
        return error ? error.details[0].message : null;
      })
      .filter(Boolean);

    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.join(", ")}`);
    }

    products = products.map((product) => ({
      ...product,
      userId: req.userId,
    }));

    const newProducts = await batchCreateProductsService(products);
    res.status(201).json(newProducts);
  } catch (error) {
    next(error);
  }
};

export const batchUpdateProducts = async (req, res, next) => {
  try {
    let products = req.body;

    if (!Array.isArray(products)) {
      throw new Error("Input must be an array of products");
    }

    const validationErrors = products
      .map((product) => {
        const { error } = productSchema.validate(product);
        return error ? error.details[0].message : null;
      })
      .filter(Boolean);

    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.join(", ")}`);
    }

    products = products.map((product) => ({
      ...product,
      userId: req.userId,
    }));

    const updatedProducts = await batchUpdateProductsService(products);
    res.status(200).json(updatedProducts);
  } catch (error) {
    next(error);
  }
};

export const batchDeleteProducts = async (req, res, next) => {
  try {
    const productIds = req.body;

    if (!Array.isArray(productIds)) {
      throw new Error("Input must be an array of product IDs");
    }

    await batchDeleteProductsService(productIds);

    res.status(200).json({
      message: "Products deleted successfully",
      deletedProducts: productIds,
    });
  } catch (error) {
    next(error);
  }
};
