"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Ruta para el registro
router.post("/register", auth_controller_1.registerUser);
router.post("/login", auth_controller_1.loginUser);
router.get("/token", auth_middleware_1.authenticateToken, auth_controller_1.mauro);
exports.default = router;
