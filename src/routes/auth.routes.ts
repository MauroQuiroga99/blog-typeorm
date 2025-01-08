import { Router } from "express";
import { registerUser } from "../controllers/auth.controller"; // El controlador que manejará el registro

const router = Router();

// Ruta para el registro
router.post("/register", registerUser);

export default router;
