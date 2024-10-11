import { User } from "../models/User";
import { createUser } from "./auth.service";
import { jest } from '@jest/globals';
jest.mock("../models/User");


describe("createUser", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new user successfully", async () => {
    // Arrange
    const userData = {
      name: "Joahn Doe",
      phone: "1234567890",
      email: "johna.doe@example.com",
      password: "passaword123",
      img_profile: "http://example.com/image.jpg",
    };

    User.prototype.save = jest.fn().mockResolvedValue(userData);

    // Act
    const result = await createUser(userData);

    // Assert
    expect(result.name).toEqual(userData.name);
    expect(result.phone).toEqual(userData.phone);
    expect(result.email).toEqual(userData.email);
    expect(result.img_profile).toEqual(userData.img_profile);
    expect(User.prototype.save).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if required fields are missing", async () => {
    // Arrange
    const userData = {
      name: "",
      phone: "1234567890",
      email: "johna.doe@example.com",
      password: "passaword123",
      img_profile: "http://example.com/image.jpg",
    };

    // Act & Assert
    await expect(createUser(userData)).rejects.toThrow("Name, phone, email, and password are required");
  });

  it("should throw an error for invalid email format", async () => {
    // Arrange
    const userData = {
      name: "Joahn Doe",
      phone: "1234567890",
      email: "johna.doe@invalid",
      password: "passaword123",
      img_profile: "http://example.com/image.jpg",
    };

    // Act & Assert
    await expect(createUser(userData)).rejects.toThrow("Invalid email format");
  });

  it("should call User.save with the correct data", async () => {
    // Arrange
    const userData = {
      name: "Joahn Doe",
      phone: "1234567890",
      email: "johna.doe@example.com",
      password: "passaword123",
      img_profile: "http://example.com/image.jpg",
    };

    const newUserInstance = new User(userData);
    User.prototype.save = jest.fn().mockResolvedValue(newUserInstance);

    // Act
    await createUser(userData);

    // Assert
    expect(User.prototype.save).toHaveBeenCalledWith();
  });
});