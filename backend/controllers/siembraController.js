import SiembraModel from "../models/siembraModel.js";
import ResponsableModel from "../models/responsableModel.js";
import EspecieModel from "../models/especieModel.js";
import EstanqueModel from "../models/estanqueModel.js";

// Definición de relaciones
SiembraModel.belongsTo(ResponsableModel, { foreignKey: 'Id_Responsable' });
SiembraModel.belongsTo(EspecieModel, { foreignKey: 'Id_Especie' });
SiembraModel.belongsTo(EstanqueModel, { foreignKey: 'Id_Estanque' });

ResponsableModel.hasMany(SiembraModel, { foreignKey: 'Id_Responsable' });
EspecieModel.hasMany(SiembraModel, { foreignKey: 'Id_Especie' });
EstanqueModel.hasMany(SiembraModel, { foreignKey: 'Id_Estanque' });

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
        res.status(200).json(siembras);
    } catch (error) {
        console.error('Error fetching siembras:', error);
        res.status(500).json({ message: 'Error fetching siembras' });
    }
};

// Obtener un registro por ID
export const getSiembra = async (req, res) => {
    try {
        const siembra = await SiembraModel.findByPk(req.params.Id_Siembra, {
            include: [
                { model: ResponsableModel, attributes: ['Nom_Responsable'] },
                { model: EspecieModel, attributes: ['Nom_Especie'] },
                { model: EstanqueModel, attributes: ['Nom_Estanque'] }
            ]
        });
        if (siembra) {
            res.status(200).json(siembra);
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.error('Error fetching siembra:', error);
        res.status(500).json({ message: 'Error fetching siembra' });
    }
};

// Crear un registro
export const createSiembra = async (req, res) => {
    try {
        const newSiembra = await SiembraModel.create(req.body);
        res.status(201).json(newSiembra);
    } catch (error) {
        console.error('Error creating siembra:', error);
        res.status(500).json({ message: 'Error al registrar la siembra', error: error.message });
    }
};

// Actualizar un registro
export const updateSiembra = async (req, res) => {
    try {
        const updated = await SiembraModel.update(req.body, {
            where: { Id_Siembra: req.params.Id_Siembra }
        });
        if (updated[0] > 0) {
            res.status(200).json({ message: "¡Registro actualizado exitosamente!" });
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.error('Error updating siembra:', error);
        res.status(500).json({ message: 'Error updating siembra', error: error.message });
    }
};

// Borrar un registro
export const deleteSiembra = async (req, res) => {
    try {
        const deleted = await SiembraModel.destroy({
            where: { Id_Siembra: req.params.Id_Siembra }
        });
        if (deleted > 0) {
            res.status(200).json({ message: "¡Registro borrado exitosamente!" });
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.error('Error deleting siembra:', error);
        res.status(500).json({ message: 'Error deleting siembra', error: error.message });
    }
};

export const getSiembraByFechaInicio = async (req, res) => {
    const { Fec_Siembra } = req.params;

    if (!Fec_Siembra) {
        return res.status(400).json({ message: 'Fecha es requerida' });
    }

    try {
        const siembras = await SiembraModel.findAll({
            where: {
                Fec_Siembra: Fec_Siembra
            },
            include: [
                { model: ResponsableModel, attributes: ['Nom_Responsable'] },
                { model: EspecieModel, attributes: ['Nom_Especie'] },
                { model: EstanqueModel, attributes: ['Nom_Estanque'] }
            ]
        });

        if (siembras.length > 0) {
            return res.status(200).json(siembras);
        } else {
            return res.status(404).json({ message: "No se encontraron siembras para la fecha dada" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al recuperar siembras por fecha de inicio." });
    }
};



