import { Request, Response } from "express";
import { User } from "../models/User";
import { Pais } from "../models/Pais";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 📌 Registrar un nuevo usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, pais_id } = req.body;
    
    // Validar campos obligatorios
    if (!name || !email || !password || !pais_id) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Verificar si el país existe en la base de datos
    const countryExists = await Pais.findByPk(pais_id);
    if (!countryExists) {
      return res.status(400).json({ message: "El país seleccionado no es válido" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pais_id,
    });

    return res.status(201).json({ message: "Usuario creado exitosamente", user });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Autenticar un usuario (login)
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Obtener perfil del usuario autenticado
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Buscar el usuario en la base de datos, incluyendo la relación con el país
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "pais_id"],
      include: [{ model: Pais, attributes: ["nombre"] }],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
