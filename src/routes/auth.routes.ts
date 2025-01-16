import { Router } from "express";
import { registerUser, loginUser, mauro } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Ruta para el registro
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/token", authenticateToken, mauro);

export default router;
