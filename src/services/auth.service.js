import { AccessToken } from "../models/AccessToken.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * Creates a new user.
 *
 * @async
 * @function createUser
 * @param {Object} userData - The user's data.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.phone - The user's phone number.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @param {string} [userData.img_profile] - The user's profile image URL (optional).
 * @returns {Promise<Object>} The newly created user object.
 * @throws {Error} If required fields are missing or the email format is invalid.
 */

export const createUser = async ({
  name,
  phone,
  email,
  password,
  img_profile,
}) => {
  try {
    if (!name || !phone || !email || !password) {
      throw new Error("Name, phone, email, and password are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    const newUser = new User({
      name,
      phone,
      email,
      password,
      img_profile,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Logs in a user and generates a JWT access token.
 *
 * @async
 * @function loginUser
 * @param {Object} credentials - The user's credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} An object containing the JWT if the login is successful.
 * @throws {Error} If the email or password are not provided, if the user is not found, or if the password is incorrect.
 */

export const loginUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await User.findOne({ email });
    const matchPassword = await User.schema.methods.comparePassword({
      candidatePassword: password,
      hash: user.password,
    });
    if (!user || !matchPassword) {
      throw new Error("User not found or incorrect password ");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const accessToken = new AccessToken({
      user_id: user._id,
      token,
    });
    await accessToken.save();
    return { token };
  } catch (error) {
    throw error;
  }
};

/**
 * Logs out a user by deleting their access token from the database.
 *
 * @async
 * @function logoutUser
 * @param {Object} params - The parameters for the function.
 * @param {string} params.token - The access token to be logged out.
 * @throws {Error} If the token is invalid or if there is an error during the deletion process.
 * @returns {Promise<Object>} The deleted access token object if successful.
 */

export const logoutUser = async ({ token }) => {
  try {
    const accessToken = await AccessToken.findOneAndDelete({ token });
    if (!accessToken) {
      throw new Error("Invalid token");
    }
    return accessToken;
  } catch (error) {
    throw error;
  }
};
