import { validateToken } from "../jwt";
import { Request, Response } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: () => void
): any => {
  const token = (req.headers.authorization || "").split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no provisto" });
  }

  const payload = validateToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Token inválido" });
  }

  next();
};
