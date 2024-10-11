import { AccessToken } from "../models/AccessToken.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

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
