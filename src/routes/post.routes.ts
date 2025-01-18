import { Router } from "express";

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticateToken, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
