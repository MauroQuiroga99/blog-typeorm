"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticateToken, post_controller_1.createPost);
router.get("/", post_controller_1.getPosts);
router.get("/:id", post_controller_1.getPostById);
router.put("/:id", auth_middleware_1.authenticateToken, post_controller_1.updatePost);
router.delete("/:id", post_controller_1.deletePost);
exports.default = router;
