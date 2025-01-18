import { Request, Response } from "express";
import Post from "../entities/Post";

export const createPost = async (req: Request, res: Response): Promise<any> => {
  const { title, content, status } = req.body;

  if (!title || !content || !status) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const post = new Post();
    post.title = title;
    post.content = content;
    post.status = status;
    //@ts-ignore
    post.userId = req.userId;

    await post.save();

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
    return res.status(500).json({ message: "Error desconocido" });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
    return res.status(500).json({ message: "Error desconocido" });
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const post = await Post.findOneBy({ id });

    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    return res.status(200).json(post);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
    return res.status(500).json({ message: "Error desconocido" });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, content, status } = req.body;

  try {
    const post = await Post.findOneBy({ id });

    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;

    await post.save();

    return res.status(200).json({
      message: "Publicación actualizada con éxito",
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        status: post.status,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
    return res.status(500).json({ message: "Error desconocido" });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const post = await Post.findOneBy({ id });

    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    await post.remove();

    return res.status(200).json({ message: "Publicación eliminada con éxito" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
    return res.status(500).json({ message: "Error desconocido" });
  }
};
