import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export const generateToken = (
  payload: object,
  expiresIn: string | number = "1h"
): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const validateToken = (token: string): object | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as object;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export default { generateToken, validateToken };
