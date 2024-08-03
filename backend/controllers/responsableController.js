import { Sequelize, Op } from "sequelize";
import responsableModel from "../models/responsableModel.js";

// Obtener todos los registros
export const getAllResponsable = async (req, res) => {
    try {
        const responsable = await responsableModel.findAll();
        if (responsable.length > 0) {
            res.status(200).json(responsable); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getResponsable = async (req, res) => {
    try {
        const responsable = await responsableModel.findByPk(req.params.id);
        if (responsable) {
            res.status(200).json(responsable); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createResponsable = async (req, res) => {
    try {
        await responsableModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateResponsable = async (req, res) => {
    try {
        const [updated] = await responsableModel.update(req.body, {
            where: { Id_Responsable: req.params.id }
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
export const deleteResponsable = async (req, res) => {
    try {
        const deleted = await responsableModel.destroy({
            where: { Id_Responsable: req.params.id }
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
