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
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../entities/Post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, status } = req.body;
    if (!title || !content || !status) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    try {
        const post = new Post_1.default();
        post.title = title;
        post.content = content;
        post.status = status;
        //@ts-ignore
        post.userId = req.userId;
        yield post.save();
        return res.status(201).json({
            message: "Publicación creada con éxito",
            post: {
                id: post.id,
                title: post.title,
                content: post.content,
                status: post.status,
                userId: post.userId,
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
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find();
        return res.status(200).json(posts);
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
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield Post_1.default.findOneBy({ id });
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        return res.status(200).json(post);
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
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, status } = req.body;
    try {
        const post = yield Post_1.default.findOneBy({ id });
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        post.status = status || post.status;
        yield post.save();
        return res.status(200).json({
            message: "Publicación actualizada con éxito",
            post: {
                id: post.id,
                title: post.title,
                content: post.content,
                status: post.status,
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
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield Post_1.default.findOneBy({ id });
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        yield post.remove();
        return res.status(200).json({ message: "Publicación eliminada con éxito" });
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
exports.deletePost = deletePost;
