import jwt from "jsonwebtoken";
import { AccessToken } from "../models/AccessToken.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = await AccessToken.findOne({
      token,
      user_id: decoded.userId,
    });
    if (!accessToken) {
      throw new Error("Invalid token");
    }
    if (accessToken.expiresAt < new Date()) {
      await AccessToken.findByIdAndDelete(accessToken._id);
      throw new Error("Token expirado");
    }

    req.token = token;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized request!" });
  }
};
