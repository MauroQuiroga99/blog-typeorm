"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";
const generateToken = (payload, expiresIn = "1h") => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
};
exports.generateToken = generateToken;
const validateToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
exports.validateToken = validateToken;
exports.default = { generateToken: exports.generateToken, validateToken: exports.validateToken };
