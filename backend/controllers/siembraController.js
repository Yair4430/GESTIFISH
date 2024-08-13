<<<<<<< HEAD
import siembraModel from "../models/siembraModel.js";

// Obtener todos los registros
export const getAllSiembra = async (req, res) => {
    try {
        const siembra = await siembraModel.findAll();
        if (siembra.length > 0) {
            res.status(200).json(siembra); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getSiembra = async (req, res) => {
    try {
        const siembra = await siembraModel.findByPk(req.params.id);
        if (siembra) {
            res.status(200).json(siembra); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createSiembra = async (req, res) => {
    try {
        await siembraModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateSiembra = async (req, res) => {
    try {
        const [updated] = await siembraModel.update(req.body, {
            where: { Id_Siembra: req.params.id }
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
export const deleteSiembra = async (req, res) => {
    try {
        const deleted = await siembraModel.destroy({
            where: { Id_Siembra: req.params.id }
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
import siembraModel from "../models/siembraModel.js";

// Obtener todos los registros
export const getAllSiembra = async (req, res) => {
    try {
        const siembra = await siembraModel.findAll();
        if (siembra.length > 0) {
            res.status(200).json(siembra); // 200 OK
        } else {
            res.status(404).json({ message: "No se encontraron registros" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Mostrar un Registro
export const getSiembra = async (req, res) => {
    try {
        const siembra = await siembraModel.findByPk(req.params.id);
        if (siembra) {
            res.status(200).json(siembra); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Crear un registro
export const createSiembra = async (req, res) => {
    try {
        await siembraModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" }); // 201 Created
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

// Actualizar un registro
export const updateSiembra = async (req, res) => {
    try {
        const [updated] = await siembraModel.update(req.body, {
            where: { Id_Siembra: req.params.id }
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
export const deleteSiembra = async (req, res) => {
    try {
        const deleted = await siembraModel.destroy({
            where: { Id_Siembra: req.params.id }
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
