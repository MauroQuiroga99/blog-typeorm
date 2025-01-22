"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_1 = require("../jwt");
const authenticateToken = (req, res, next) => {
    const token = (req.headers.authorization || "").split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token no provisto" });
    }
    const payload = (0, jwt_1.validateToken)(token);
    if (!payload) {
        return res.status(401).json({ message: "Token inválido" });
    }
    console.log("Payload:", payload);
    //@ts-ignore
    req.userId = payload.id;
    next();
};
exports.authenticateToken = authenticateToken;
