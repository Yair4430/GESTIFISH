import { Sequelize, Op } from "sequelize";
import cosechaModel from "../models/cosechaModel.js";

// Obtener todos los registros
export const getAllCosecha = async (req, res) => {
    try {
        const cosecha = await cosechaModel.findAll();
        if (cosecha.length > 0) {
            res.status(200).json(cosecha); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getCosecha = async (req, res) => {
    try {
        const cosecha = await cosechaModel.findByPk(req.params.id);
        if (cosecha) {
            res.status(200).json(cosecha); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createCosecha = async (req, res) => {
    try {
        await cosechaModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateCosecha = async (req, res) => {
    try {
        const [updated] = await cosechaModel.update(req.body, {
            where: { Id_Cosecha: req.params.id }
        });
        if (updated > 0) {
            res.status(200).json({ message: "¡Registro actualizado exitosamente!" }); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Borrar un registro
export const deleteCosecha = async (req, res) => {
    try {
        const deleted = await cosechaModel.destroy({
            where: { Id_Cosecha: req.params.id }
        });
        if (deleted > 0) {
            res.status(200).json({ message: "¡Registro borrado exitosamente!" }); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};
