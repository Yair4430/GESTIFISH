<<<<<<< HEAD
import { Sequelize, Op } from "sequelize";
import muestreoModel from "../models/muestreoModel.js";

// Obtener todos los registros
export const getAllMuestreo = async (req, res) => {
    try {
        const muestreo = await muestreoModel.findAll();
        if (muestreo.length > 0) {
            res.status(200).json(muestreo); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getMuestreo = async (req, res) => {
    try {
        const muestreo = await muestreoModel.findByPk(req.params.id);
        if (muestreo) {
            res.status(200).json(muestreo); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createMuestreo = async (req, res) => {
    try {
        await muestreoModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateMuestreo = async (req, res) => {
    try {
        const [updated] = await muestreoModel.update(req.body, {
            where: { Id_Muestreo: req.params.id }
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
export const deleteMuestreo = async (req, res) => {
    try {
        const deleted = await muestreoModel.destroy({
            where: { Id_Muestreo: req.params.id }
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
=======
import { Sequelize, Op } from "sequelize";
import muestreoModel from "../models/muestreoModel.js";

// Obtener todos los registros
export const getAllMuestreo = async (req, res) => {
    try {
        const muestreo = await muestreoModel.findAll();
        if (muestreo.length > 0) {
            res.status(200).json(muestreo); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getMuestreo = async (req, res) => {
    try {
        const muestreo = await muestreoModel.findByPk(req.params.id);
        if (muestreo) {
            res.status(200).json(muestreo); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createMuestreo = async (req, res) => {
    try {
        await muestreoModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateMuestreo = async (req, res) => {
    try {
        const [updated] = await muestreoModel.update(req.body, {
            where: { Id_Muestreo: req.params.id }
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
export const deleteMuestreo = async (req, res) => {
    try {
        const deleted = await muestreoModel.destroy({
            where: { Id_Muestreo: req.params.id }
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
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
