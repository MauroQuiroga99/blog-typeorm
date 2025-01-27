import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Ruta para el registro
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", authenticateToken, getMe);

export default router;
