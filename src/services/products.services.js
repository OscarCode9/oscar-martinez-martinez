import { Product } from "../models/Products.js";
import mongoose from "mongoose";

/**
 * Retrieves all products.
 *
 * @async
 * @function getAllProductsService
 * @returns {Promise<Array<Object>>} An array of all product documents.
 * @throws {Error} If an error occurs during the retrieval process.
 */
export const getAllProductsService = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves all products associated with a specific user ID.
 *
 * @async
 * @function getProductsByUserIdService
 * @param {Object} params - An object containing the user ID.
 * @param {string} params.userId - The ID of the user whose products are to be retrieved.
 * @returns {Promise<Array<Object>>} An array of product documents associated with the user.
 * @throws {Error} If an error occurs during the retrieval process.  This could include an invalid `userId` format.
 *
 */
export const getProductsByUserIdService = async ({ userId }) => {
  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    return await Product.find({ userId: objectId });
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves a product by its ID.
 *
 * @async
 * @function getProductByIdService
 * @param {Object} params - An object containing the product ID.
 * @param {string} params.productId - The ID of the product to retrieve.
 * @returns {Promise<Object>} The product document if found.
 * @throws {Error} If the product is not found or if another error occurs.
 */
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

/**
 * Creates a new product.
 *
 * @async
 * @function createProductService
 * @param {Object} productData - The data for the new product.
 * @param {string} productData.userId - The ID of the user creating the product.
 * @param {string} productData.name - The name of the product.
 * @param {string} productData.description - The description of the product.
 * @param {number} productData.height - The height of the product.
 * @param {number} productData.length - The length of the product.
 * @param {number} productData.width - The width of the product.
 * @returns {Promise<Object>} The newly created product document.
 * @throws {Error} If an error occurs during product creation.
 */
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

/**
 * Updates an existing product.
 *
 * @async
 * @function updateProductService
 * @param {string} id - The ID of the product to update.
 * @param {Object} updateData - The data to update the product with. This can include any of the fields from the product schema.
 * @returns {Promise<Object>} The updated product document.
 * @throws {Error} If the product is not found or if an error occurs during the update process.
 */
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


/**
 * Deletes a product by its ID.
 *
 * @async
 * @function deleteProductService
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<Object>} A success message if the product was deleted.
 * @throws {Error} If the product is not found or if an error occurs during deletion.
 */

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

/**
 * Creates multiple products in a batch operation.
 *
 * @async
 * @function batchCreateProductsService
 * @param {Array<Object>} productsData - An array of product data objects. Each object should represent a new product with all required fields.
 * @returns {Promise<Array<Object>>} An array of the newly created product documents.
 * @throws {Error} If an error occurs during the creation process.
 *
*/

export const batchCreateProductsService = async (productsData) => {
  try {
    return await Product.insertMany(productsData);
  } catch (error) {
    throw error;
  }
};

/**
 * Updates multiple products in a batch operation.
 *
 * @async
 * @function batchUpdateProductsService
 * @param {Array<Object>} updates - An array of product update objects. Each object should contain the `_id` of the product to update and the fields to modify.
 * @returns {Promise<Object>} An object containing an array of the updated products.
 * @throws {Error} If an error occurs during the update process.
*/

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

/**
 * Deletes multiple products in a batch operation.
 *
 * @async
 * @function batchDeleteProductsService
 * @param {Array<string>} ids - An array of product IDs to delete.
 * @returns {Promise<Object>} An object with a success message.
 * @throws {Error} If an error occurs during the deletion process.
 */

export const batchDeleteProductsService = async (ids) => {
  try {
    await Product.deleteMany({ _id: { $in: ids } });
    return { message: "Products deleted successfully" };
  } catch (error) {
    throw error;
  }
};
