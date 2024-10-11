import { Product } from "../models/Products.js";
import mongoose from "mongoose";

export const getAllProductsService = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw error;
  }
};

export const getProductsByUserIdService = async ({ userId }) => {
  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    return await Product.find({ userId: objectId });
  } catch (error) {
    throw error;
  }
};

export const getProductByIdService = async ({ productId }) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

export const createProductService = async ({
  userId,
  name,
  description,
  height,
  length,
  width,
}) => {
  try {
    const product = new Product({
      userId,
      name,
      description,
      height,
      length,
      width,
    });
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

export const updateProductService = async (id, updateData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteProductService = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const batchCreateProductsService = async (productsData) => {
  try {
    return await Product.insertMany(productsData);
  } catch (error) {
    throw error;
  }
};

export const batchUpdateProductsService = async (updates) => {
  try {
    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update._id },
        update: { $set: update },
      },
    }));
    await Product.bulkWrite(bulkOps);
    const updatedProducts = await Product.find({
      _id: { $in: updates.map((update) => update._id) },
    });
    return { updatedProducts };
  } catch (error) {
    throw error;
  }
};

export const batchDeleteProductsService = async (ids) => {
  try {
    await Product.deleteMany({ _id: { $in: ids } });
    return { message: "Products deleted successfully" };
  } catch (error) {
    throw error;
  }
};
