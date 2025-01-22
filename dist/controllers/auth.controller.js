"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mauro = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../entities/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    try {
        const existingUsername = yield User_1.default.findOneBy({ username });
        if (existingUsername) {
            return res
                .status(400)
                .json({ message: "El nombre de usuario ya está en uso" });
        }
        const existingEmail = yield User_1.default.findOneBy({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "El correo ya está en uso" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default();
        user.name = name;
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        yield user.save();
        return res.status(201).json({
            message: "Usuario registrado con éxito",
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: "Error en el servidor", error: error.message });
        }
        return res.status(500).json({ message: "Error desconocido" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email_or_username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({
            where: [{ email: email_or_username }, { username: email_or_username }],
        });
        console.log(req.body);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
        return res.status(200).json({
            message: `Bienvenido, ${user.name}!`,
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Error en loginUser:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.loginUser = loginUser;
const mauro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "Hola Mauro" });
});
exports.mauro = mauro;
