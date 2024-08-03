import { Sequelize, Op } from "sequelize";
import actividadModel from "../models/actividadModel.js";

// Obtener todos los registros
export const getAllActividad = async (req, res) => {
    try {
        const actividad = await actividadModel.findAll();
        if (actividad.length > 0) {
            res.status(200).json(actividad); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getActividad = async (req, res) => {
    try {
        const actividad = await actividadModel.findByPk(req.params.id);
        if (actividad) {
            res.status(200).json(actividad); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createActividad = async (req, res) => {
    try {
        await actividadModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateActividad = async (req, res) => {
    try {
        const [updated] = await actividadModel.update(req.body, {
            where: { Id_Actividad: req.params.id }
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
export const deleteActividad = async (req, res) => {
    try {
        const deleted = await actividadModel.destroy({
            where: { Id_Actividad: req.params.id }
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
