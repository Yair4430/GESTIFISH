import { Sequelize, Op } from "sequelize";
import alimentacionModel from "../models/alimentacionModel.js";

// Obtener todos los registros
export const getAllAlimento = async (req, res) => {
    try {
        const alimento = await alimentacionModel.findAll();
        if (alimento.length > 0) {
            res.status(200).json(alimento); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getAlimento = async (req, res) => {
    try {
        const alimento = await alimentacionModel.findAll({
            where: { id: req.params.id }
        });
        if (alimento.length > 0) {
            res.status(200).json(alimento[0]); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createAlimento = async (req, res) => {
    try {
        await alimentacionModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateAlimento = async (req, res) => {
    try {
        const updated = await alimentacionModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated[0] > 0) {
            res.status(200).json({ message: "¡Registro actualizado exitosamente!" }); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Borrar un registro
export const deleteAlimento = async (req, res) => {
    try {
        const deleted = await alimentacionModel.destroy({
            where: { id: req.params.id }
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

// Obtener registros por fecha de alimento
export const getQueryAlimento = async (req, res) => {
    try {
        const Alimento = await alimentacionModel.findAll({
            where: {
                fec_alimento: req.params.fec_alimento
            }
        });
        if (Alimento.length > 0) {
            res.status(200).json(Alimento); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros para la fecha especificada" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};
