import express from "express";
import { createUser, logInUser } from "../controllers/authController.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { check } from "express-validator";
import UsuarioModel from "../models/usuarioModel.js";
import bcryptjs from "bcryptjs";
import { verifyToken } from "../middleware/authMiddleware.js";
import { generarToken } from "../helpers/generarToken.js";

const URI = `${process.env.ROUTER_PRINCIPAL}/reset-password/`; // Asegúrate de que la URI esté correcta

const routerAuth = express.Router();

routerAuth.post(
  "/",
  [
    check("email", "por favor digite un email valido").isEmail(),
    check(
      "contraseña",
      "por favor ingrese una contraseña con mas de 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  createUser
);
//saca canas jajaja
routerAuth.get("/verify", (req, res) => {
  // Aquí debería ir la lógica para verificar el token
  res.status(200).send("Token Verified");
});

routerAuth.post(
  "/login",
  [
    check("Cor_Usuario", "Por favor ingrese un email válido").isEmail(),
    check(
      "Con_Usuario",
      "La contraseña debe tener al menos 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  logInUser
);

routerAuth.get("/verify-token", (req, res) => {
  const { token } = req.params; // Obtener el token de la URL
  try {
    // Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_LLAVE);
    res
      .status(200)
      .json({ message: "Token válido", email: decoded.Cor_Usuario });
  } catch (error) {
    res.status(400).json({ message: "Token inválido o expirado" });
  }
});
//Comprobar el token de params
routerAuth.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const tokenUser = await UsuarioModel.findOne({
      where: { Token: token },
    });
    if (tokenUser) {
      res.status(200).json({ message: "Token valido!!" });
      console.log("Hay un token valido")
      return;
    } else {
      res.status(401).json({ message: "No hay un token valido!" });
      console.log("No hay un token valido")

    }
  } catch (err) {
    res.status(500).json({ message: "Error en el server!" });
  }
});

// Ruta para cambiar la contraseña
routerAuth.post("/reset-password/:token", async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params

  try {
    // Verificar el token de restablecimiento de contraseña
    const user = await UsuarioModel.findOne({
      where: { Token: token },
    });

    if (!user) {
      return res.status(400).json({ message: 'El token es inválido o ha expirado.' });
    }

    // Actualizar la contraseña del usuario
    user.Con_Usuario = await bcryptjs.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al intentar actualizar la contraseña.' });
  }
});

routerAuth.post("/forgot-password", async (req, res) => {
  const { Cor_Usuario } = req.body;

  try {
    // 1. Verificar si el usuario existe
    const user = await UsuarioModel.findOne({ where: { Cor_Usuario } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.Token = generarToken()
    await user.save()

    //2. Genera el token con el correo codificado
    const resetToken = user.Token;

    // 3. Crear un enlace para el correo electrónico de restablecimiento
    const URI = `http://localhost:5173/reset-password/${resetToken}`;

    console.log(URI);
    // 4. Configurar el correo electrónico
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Cambia esto si usas otro servicio de correo
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "no-reply@yourapp.com",
      to: Cor_Usuario,
      subject: "Restablecimiento de contraseña",
      text: `Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para restablecerla: ${URI}`,
      html: `<p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para restablecerla:</p>
                   <a href="${URI}">Restablecer Contraseña</a>`,
    };

    // 5. Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    // 6. Responder indicando que el correo ha sido enviado
    res.status(200).json({ message: "Correo de restablecimiento enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar la solicitud" });
  }
});

// routerAuth.post('/reset-password', setNewPassword);
routerAuth.get("/protected-route", verifyToken, (req, res) => {
  res.status(200).json({ message: "Ruta protegida accesible" });
});

// Rutas protegidas
routerAuth.get("/alimentacion", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de alimentación" });
});

routerAuth.get("/responsable", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de responsable" });
});

routerAuth.get("/estanque", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de estanque" });
});

routerAuth.get("/especie", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de especie" });
});

routerAuth.get("/traslado", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de traslado" });
});

routerAuth.get("/actividad", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de actividad" });
});

routerAuth.get("/siembra", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de siembra" });
});

routerAuth.get("/mortalidad", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de mortalidad" });
});

routerAuth.get("/muestreo", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de muestreo" });
});

routerAuth.get("/cosecha", verifyToken, (req, res) => {
  res.status(200).json({ message: "Datos de cosecha" });
});

export default routerAuth;