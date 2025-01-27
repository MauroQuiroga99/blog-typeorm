import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../entities/User";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const existingUsername = await User.findOneBy({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    const existingEmail = await User.findOneBy({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await user.save();

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
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

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email_or_username, password } = req.body;

  try {
    const user = await User.findOne({
      where: [{ email: email_or_username }, { username: email_or_username }],
    });

    console.log(req.body);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

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
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<any> => {
  //@ts-ignore
  const dataUser = await User.findOneBy({ id: req.userId });
  if (!dataUser) {
    return res.status(400).json({ message: "El USUARIO NO EXISTE" });
  }

  return res.status(200).json({
    user: {
      id: dataUser.id,
      name: dataUser.name,
      username: dataUser.username,
      email: dataUser.email,
    },
  });
};
