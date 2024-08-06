import { Sequelize, Op } from "sequelize";
import trasladoModel from "../models/trasladoModel.js";

// Obtener todos los registros
export const getAllTraslado = async (req, res) => {
    try {
        const traslado = await trasladoModel.findAll();
        if (traslado.length > 0) {
            res.status(200).json(traslado); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getTraslado = async (req, res) => {
    try {
        const traslado = await trasladoModel.findByPk(req.params.id);
        if (traslado) {
            res.status(200).json(traslado); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createTraslado = async (req, res) => {
    try {
        await trasladoModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateTraslado = async (req, res) => {
    try {
        const [updated] = await trasladoModel.update(req.body, {
            where: { Id_Traslado: req.params.id }
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
export const deleteTraslado = async (req, res) => {
    try {
        const deleted = await trasladoModel.destroy({
            where: { Id_Traslado: req.params.id }
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
