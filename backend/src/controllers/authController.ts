import { Request, Response } from "express";
import { User } from "../models/Usuario";
import { Pais } from "../models/Pais";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Registrar un nuevo usuario
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });
    return res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user });
  } catch (err) {
    console.error("Error en register:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Autenticación (login)
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "pais_id"],
      include: [{ model: Pais, attributes: ["nombre"] }],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(user);
  } catch (err) {
    console.error("Error en getProfile:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Actualizar perfil: nombre, email, país o contraseña
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, email, password, pais_id, oldPassword, newPassword } =
      req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 1) Cambiar nombre
    if (name) {
      await user.update({ name });
      return res.json({ message: "Nombre actualizado correctamente" });
    }

    // 2) Cambiar email (requiere contraseña actual)
    if (email && password) {
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
      await user.update({ email });
      return res.json({ message: "Email actualizado correctamente" });
    }

    // 3) Cambiar país
    if (pais_id !== undefined) {
      const country = await Pais.findByPk(pais_id);
      if (!country) {
        return res.status(400).json({ message: "País no válido" });
      }
      await user.update({ pais_id });
      return res.json({ message: "País actualizado correctamente" });
    }

    // 4) Cambiar contraseña (requiere oldPassword + newPassword)
    if (oldPassword && newPassword) {
      const ok = await bcrypt.compare(oldPassword, user.password);
      if (!ok) {
        return res
          .status(400)
          .json({ message: "Contraseña actual incorrecta" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(newPassword, salt);
      await user.update({ password: hashed });
      return res.json({ message: "Contraseña actualizada correctamente" });
    }

    return res
      .status(400)
      .json({ message: "No se han proporcionado datos para actualizar" });
  } catch (err) {
    console.error("Error en updateProfile:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Eliminar cuenta del usuario autenticado
 */
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await User.destroy({ where: { id: userId } });
    return res.status(200).json({ message: "Cuenta eliminada correctamente" });
  } catch (err) {
    console.error("Error en deleteProfile:", err);
    return res.status(500).json({ message: "Error al eliminar la cuenta" });
  }
};

/**
 * Olvidé mi contraseña: comprueba si el email existe
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Falta el email" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email no registrado" });

    // Aquí podrías enviar un email con un token, pero de momento:
    return res.json({
      message: "Email correcto.",
    });
  } catch (err) {
    console.error("Error en forgotPassword:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Resetear contraseña: recibe email + newPassword
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }
    // opcional: validar fuerza (letra + número/símbolo)
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/;
    if (!pwdRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "La contraseña debe incluir al menos una letra y un número/símbolo",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email no registrado" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    await user.update({ password: hashed });

    return res.json({ message: "Contraseña restablecida con éxito" });
  } catch (err) {
    console.error("Error en resetPassword:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
