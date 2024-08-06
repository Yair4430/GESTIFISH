import { Sequelize, Op } from "sequelize";
import especieModel from "../models/especieModel.js";

// Obtener todos los registros
export const getAllEspecie = async (req, res) => {
    try {
        const especie = await especieModel.findAll();
        if (especie.length > 0) {
            res.status(200).json(especie); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getEspecie = async (req, res) => {
    try {
        const especie = await especieModel.findByPk(req.params.id);
        if (especie) {
            res.status(200).json(especie); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createEspecie = async (req, res) => {
    try {
        await especieModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateEspecie = async (req, res) => {
    try {
        const [updated] = await especieModel.update(req.body, {
            where: { Id_Especie: req.params.id }
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
export const deleteEspecie = async (req, res) => {
    try {
        const deleted = await especieModel.destroy({
            where: { Id_Especie: req.params.id }
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
