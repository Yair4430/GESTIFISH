import SiembraModel from "../models/siembraModel.js";
import ResponsableModel from "../models/responsableModel.js";
import EspecieModel from "../models/especieModel.js";
import EstanqueModel from "../models/estanqueModel.js";


// Obtener todos los registros
export const getAllSiembra = async (req, res) => {
    try {
        const siembras = await SiembraModel.findAll({
            include: [
                {
                    model: ResponsableModel,
                    attributes: ['Nom_Responsable'],
                },
                {
                    model: EspecieModel,
                    attributes: ['Nom_Especie'],
                },
                {
                    model: EstanqueModel,
                    attributes: ['Nom_Estanque'],
                },
            ],
        });
        console.log(siembras)
        res.status(200).json(siembras);
    } catch (error) {
        console.error('Error fetching siembras:', error);
        res.status(500).json({ message: 'Error fetching siembras' });
    }
};

// Mostrar un Registro
export const getSiembra = async (req, res) => {
    try {
        const siembra = await SiembraModel.findByPk(req.params.id, {
            include: [
                { model: ResponsableModel, attributes: ['Nom_Responsable'] },
                { model: EspecieModel, attributes: ['Nom_Especie'] },
                { model: EstanqueModel, attributes: ['Nom_Estanque'] }
            ]
        });
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
        const newSiembra = await SiembraModel.create(req.body);
        res.status(201).json(newSiembra); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la siembra', error: error.message });
    }
};

// Actualizar un registro
export const updateSiembra = async (req, res) => {
    try {
        const [updated] = await SiembraModel.update(req.body, {
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
        const deleted = await SiembraModel.destroy({
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

export const getQuerySiembra = async (req, res) => {
    const { Id_Siembra } = req.params;
    try {
        const siembra = await SiembraModel.findByPk(Id_Siembra);
        if (siembra) {
            res.status(200).json(siembra); // 200 OK
        } else {
            res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};
