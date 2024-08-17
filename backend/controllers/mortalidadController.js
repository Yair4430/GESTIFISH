import { Sequelize, Op } from "sequelize";
import mortalidadModel from "../models/mortalidadModel.js";

// Obtener todos los registros
export const getAllMortalidad = async (req, res) => {
    try {
        const mortalidad = await mortalidadModel.findAll();
        if (mortalidad.length > 0) {
            res.status(200).json(mortalidad); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getMortalidad = async (req, res) => {
    try {
        const mortalidad = await mortalidadModel.findByPk(req.params.id);
        if (mortalidad) {
            res.status(200).json(mortalidad); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createMortalidad = async (req, res) => {
    try {
        await mortalidadModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateMortalidad = async (req, res) => {
    try {
        const [updated] = await mortalidadModel.update(req.body, {
            where: { Id_Mortalidad: req.params.id }
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
export const deleteMortalidad = async (req, res) => {
    try {
        const deleted = await mortalidadModel.destroy({
            where: { Id_Mortalidad: req.params.id }
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
