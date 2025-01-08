import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
const router = Router();

// Ruta para el registro
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
