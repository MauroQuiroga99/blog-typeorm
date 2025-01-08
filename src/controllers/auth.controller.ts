import { Request, Response } from "express";
import User from "../entities/User";

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

    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = password;

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
