import { Product } from "../models/Products.js";
import {
  getProductsByUserIdService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  batchCreateProductsService,
  batchUpdateProductsService,
  batchDeleteProductsService,
} from "./products.services.js";
import { jest } from "@jest/globals";

jest.mock("../models/Products.js");

describe("createProductService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Use clearAllMocks to reset mock state
  });
  it("should create and return a new product", async () => {
    // Arrange
    const productData = {
      userId: "userId",
      name: "New Product",
      description: "Product Description",
      height: 10,
      length: 20,
      width: 30,
    };
    Product.prototype.save = jest.fn().mockResolvedValue(productData);

    // Act
    const result = await createProductService(productData);

    // Assert
    expect(result.name).toEqual(productData.name);
    expect(result.description).toEqual(productData.description);
    expect(result.height).toEqual(productData.height);
    expect(result.length).toEqual(productData.length);
    expect(result.width).toEqual(productData.width);

    expect(Product.prototype.save).toHaveBeenCalledTimes(1);
  });

  it("should return the product by ID", async () => {
    // Arrange
    const productId = "6708dc74d2f48330d6f2d064";
    const mockProduct = {
      _id: productId,
      name: "Existing Product",
      description: "Product Description",
      height: 10,
      length: 20,
      width: 30,
    };

    jest
      .spyOn(Product, "findById")
      .mockReturnThis()
      .mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockProduct),
      });

    // Act
    const result = await getProductByIdService(mockProduct._id);
    const newResult = await result.exec();

    // Assert
    expect(Product.findById).toHaveBeenCalledTimes(1);
    expect(newResult.name).toEqual(mockProduct.name);
    expect(newResult.description).toEqual(mockProduct.description);
    expect(newResult.height).toEqual(mockProduct.height);
    expect(newResult.length).toEqual(mockProduct.length);
    expect(newResult.width).toEqual(mockProduct.width);
    expect(Product.findById).toHaveBeenCalledWith(productId);
  });

  it("should return products by user ID", async () => {
    const userId = "user123";
    const mockProducts = [
      { _id: "1", userId },
      { _id: "2", userId },
    ];
    jest.spyOn(Product, "find").mockResolvedValue(mockProducts);

    const result = await getProductsByUserIdService(userId);
    // Assert
    expect(Product.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
    expect(Product.find).toHaveBeenCalledWith({ userId });
  });

  it("should update a product", async () => {
    const productId = "productToUpdate";
    const updateData = { name: "Updated Name" };
    const updatedProduct = { _id: productId, ...updateData };

    jest.spyOn(Product, "findByIdAndUpdate").mockResolvedValue(updatedProduct);

    const result = await updateProductService(productId, updateData);

    // Assert
    expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedProduct);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
  });

  it("should throw error if product not found when updating", async () => {
    const productId = "nonExistentId";
    const updateData = { name: "Updated Name" };

    jest.spyOn(Product, "findByIdAndUpdate").mockResolvedValue(null);

    await expect(updateProductService(productId, updateData)).rejects.toThrow(
      "Product not found"
    );
  });

  it("should delete a product", async () => {
    const productId = "productToDelete";
    const deletedProduct = { _id: productId, name: "Deleted Product" };

    jest.spyOn(Product, "findByIdAndDelete").mockResolvedValue(deletedProduct);
    const result = await deleteProductService(productId);

    // Assert
    expect(Product.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ message: "Product deleted successfully" });
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(productId);
  });

  it("should throw error if product not found when deleting", async () => {
    const productId = "nonExistentIdForDelete";

    jest.spyOn(Product, "findByIdAndDelete").mockResolvedValue(null);

    await expect(deleteProductService(productId)).rejects.toThrow(
      "Product not found"
    );
  });

  it("should create multiple products", async () => {
    const productsData = [
      { userId: "u1", name: "Product 1" },
      { userId: "u2", name: "Product 2" },
    ];
    jest.spyOn(Product, "insertMany").mockResolvedValue(productsData);

    const result = await batchCreateProductsService(productsData);

    // Assert
    expect(result).toEqual(productsData);
    expect(Product.insertMany).toHaveBeenCalledTimes(1);
    expect(Product.insertMany).toHaveBeenCalledWith(productsData);
  });

  it("should update multiple products", async () => {
    const updates = [
      { _id: "p1", name: "Updated 1" },
      { _id: "p2", name: "Updated 2" },
    ];
    const updatedProducts = [
      { _id: "p1", name: "Updated 1" },
      { _id: "p2", name: "Updated 2" },
    ];
    jest.spyOn(Product, "bulkWrite").mockResolvedValue({}); // Mock bulkWrite response
    jest.spyOn(Product, "find").mockResolvedValue(updatedProducts);

    const result = await batchUpdateProductsService(updates);

    expect(result.updatedProducts).toEqual(updatedProducts);

    const expectedBulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update._id },
        update: { $set: update },
      },
    }));

    // Assert
    expect(Product.bulkWrite).toHaveBeenCalledTimes(1);
    expect(Product.bulkWrite).toHaveBeenCalledWith(expectedBulkOps);
  });

  it("should delete multiple products", async () => {
    const ids = ["p1toDelete", "p2toDelete"];
    jest.spyOn(Product, "deleteMany").mockResolvedValue({});

    const result = await batchDeleteProductsService(ids);

    expect(result).toEqual({ message: "Products deleted successfully" });
    expect(Product.deleteMany).toHaveBeenCalledTimes(1);
    expect(Product.deleteMany).toHaveBeenCalledWith({ _id: { $in: ids } });
  });
});
