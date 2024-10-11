import { productSchema } from "./products.validator";

describe("Product Schema Validation", () => {
  it("should successfully validate a valid product object", () => {
    const validProduct = {
      name: "Test Product",
      description: "A test product description",
      height: 10,
      length: 20,
      width: 30,
      userId: "user123",
    };

    const { error } = productSchema.validate(validProduct);
    expect(error).toBeUndefined(); // No validation error
  });

  it("should successfully validate a valid product object with optional _id", () => {
    const validProductWithId = {
      _id: "64c3e9e1663681793f3f24ed",
      name: "Test Product with Id",
      description: "A test product description with id",
      height: 10,
      length: 20,
      width: 30,
      userId: "user1234",
    };

    const { error } = productSchema.validate(validProductWithId);
    expect(error).toBeUndefined(); // No validation error
  });

  it("should fail validation if name is missing", () => {
    const invalidProduct = {
      description: "A test product description",
      height: 10,
      length: 20,
      width: 30,
      userId: "user123",
    };

    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined(); // Error should exist
    expect(error.details[0].message).toContain('"name" is required'); // Check error message
  });

  it("should fail validation if name is not a string", () => {
    const invalidProduct = {
      name: 123, // Invalid name (number)
      description: "A test product description",
      height: 10,
      length: 20,
      width: 30,
      userId: "user123",
    };

    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"name" must be a string');
  });

  it("should trim whitespace from name and description", () => {
    const productWithWhitespace = {
      name: "  Test Product with Whitespace  ",
      description: "   A test description with whitespace   ",
      height: 10,
      length: 20,
      width: 30,
      userId: "user123",
    };

    const { value } = productSchema.validate(productWithWhitespace);
    expect(value.name).toBe("Test Product with Whitespace"); // Whitespace trimmed
    expect(value.description).toBe("A test description with whitespace"); // Whitespace trimmed
  });
});
