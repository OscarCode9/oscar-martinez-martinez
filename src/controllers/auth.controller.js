import {
  createUserSchema,
  loginUserSchema,
} from "../models/validatorSchema/user.validator.js";
import { createUser, loginUser, logoutUser } from "../services/auth.service.js";

export const createUserController = async (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    throw error;
  }

  try {
    const { name, phone, email, password, img_profile } = req.body;
    const userInfo = {
      name,
      phone,
      email,
      password,
      img_profile,
    };
    const user = await createUser(userInfo);
    res.status(201).json({ user, meesage: "User has been created" });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
      throw error;
    }
    const { email, password } = req.body;
    const userInfo = {
      email,
      password,
    };
    const user = await loginUser(userInfo);
    res.status(200).json({ user, message: "User has been logged in" });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const token = req.token;
    if (!token) {
      throw new Error("Token is required");
    }
    const accessToken = await logoutUser({ token });
    if (!accessToken) {
      throw new Error("Invalid token");
    }
    res.status(200).json({ message: "User has been logged out" });
  } catch (error) {
    next(error);
  }
};
