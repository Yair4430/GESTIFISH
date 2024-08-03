import { Sequelize, Op } from "sequelize";
import estanqueModel from "../models/estanqueModel.js";

// Obtener todos los registros
export const getAllEstanque = async (req, res) => {
    try {
        const estanque = await estanqueModel.findAll();
        if (estanque.length > 0) {
            res.status(200).json(estanque); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getEstanque = async (req, res) => {
    try {
        const estanque = await estanqueModel.findByPk(req.params.id);
        if (estanque) {
            res.status(200).json(estanque); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createEstanque = async (req, res) => {
    try {
        await estanqueModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateEstanque = async (req, res) => {
    try {
        const [updated] = await estanqueModel.update(req.body, {
            where: { Id_Estanque: req.params.id }
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
export const deleteEstanque = async (req, res) => {
    try {
        const deleted = await estanqueModel.destroy({
            where: { Id_Estanque: req.params.id }
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
