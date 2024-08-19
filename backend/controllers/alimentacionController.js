import { Sequelize, Op } from "sequelize";
import alimentacionModel from "../models/alimentacionModel.js";
import SiembraModel from "../models/siembraModel.js";
import ResponsableModel from "../models/responsableModel.js";
import logger from "../middleware/logger.js";

// Obtener todos los registros con las relaciones
export const getAllAlimento = async (req, res) => {
    try {
        const alimento = await alimentacionModel.findAll({
            include: [
                {
                    model: SiembraModel,
                    as: 'siembra'
                },
                {
                    model: ResponsableModel,
                    as: 'responsable'
                }
            ]
        });

        if (alimento.length > 0) {
            logger.warn('No se encontraron Alimento');
            return res.status(404).json({ message: 'No se encontraron Alimento' }); // 200 OK
        }

        logger.info('Todas las Alimentos obtenidas exitosamente');
        res.json(alimento);
    } catch (error) {
        logger.error("Error al obtener todos los Alimentos:", error )
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

export const getAlimento = async (req, res) => {
    const { Id_Alimentacion } = req.params;

    if (!Id_Alimentacion) {
        logger.warn('Id_Alimentacion es requerido y no puede estar vacío');
        return res.status(400).json({ message: 'Id_Alimentacion es requerido y no puede estar vacío' });
    }

    try {
        const alimento = await alimentacionModel.findByPk(Id_Alimentacion,{
            include: [
                {model: SiembraModel, as: 'siembra'},
                {model: ResponsableModel, as: 'responsable'}
            ]

        });
        if (alimento) {
            logger.info(`Alimento con ID ${Id_Alimentacion} obtenido exitosamente`);
            return res.status(200).json(alimento); // 200 OK
        } else {
            logger.warn(`Alimento con ID ${Id_Alimentacion} no encontrado`);
            return res.status(404).json({ message: "Registro no encontrado" }); // 404 Not Found
        }
    } catch (error) {
        logger.error('Error al obtener alimento:', error);
        console.error('Error al obtener alimento:', error);
        return res.status(500).json({ message: 'Error al obtener alimento', error: error.message }); // 500 Internal Server Error
    }
};


// Crear un registro
export const createAlimento = async (req, res) => {
    const { Fec_Alimentacion, Can_RacionKg, Id_Siembra, Id_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion } = req.body;

    // Validar que todos los campos están presentes
    if (!Fec_Alimentacion || !Can_RacionKg || !Id_Siembra || !Id_Responsable || !Tip_Alimento || !Hor_Alimentacion || !Vlr_Alimentacion) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: "Todos los campos son obligatorios y no deben estar vacíos" });
    }

    try {
        // Lógica para crear el nuevo registro
        const newAlimento = await alimentacionModel.create({
            Fec_Alimentacion,
            Can_RacionKg,
            Id_Siembra,
            Id_Responsable,
            Tip_Alimento,
            Hor_Alimentacion,
            Vlr_Alimentacion
        });
        return res.status(201).json(newAlimento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro
export const updateAlimento = async (req, res) => {
    try {
        console.log(req.body); // <-- Agrega esto para depurar

        const { Fec_Alimentacion, Can_RacionKg, Id_Siembra, Id_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion } = req.body;

        if (!Fec_Alimentacion || !Can_RacionKg || !Id_Siembra || !Id_Responsable || !Tip_Alimento || !Hor_Alimentacion || !Vlr_Alimentacion) {
            return res.status(400).json({ message: "Todos los campos son obligatorios y no deben estar vacíos" });
        }

        const alimento = await alimentacionModel.update(
            { Fec_Alimentacion, Can_RacionKg, Id_Siembra, Id_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion },
            { where: { Id_Alimentacion: req.params.Id_Alimentacion } }
        );

        if (alimento[0] === 0) {
            return res.status(404).json({ message: "No se encontró el registro para actualizar" });
        }

        res.json({ message: "Registro actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Borrar un registro
export const deleteAlimento = async (req, res) => {
    const { Id_Alimentacion } = req.params; // ID del alimento a borrar

    if (!Id_Alimentacion || !Id_Alimentacion.length) {
        logger.warn('ID es requerido');
        return res.status(400).json({ message: 'ID es requerido' });
    }

    try {
        const result = await alimentacionModel.destroy({
            where: { Id_Alimentacion }
        });

        if (result > 0) {
            logger.info(`Alimento con ID ${Id_Alimentacion} eliminado exitosamente`);
            return res.status(200).json({ message: '¡Registro borrado exitosamente!' });
        } else {
            logger.warn(`Alimento con ID ${Id_Alimentacion} no encontrado`);
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar alimento:', error);
        return res.status(500).json({ message: 'Error al eliminar alimento', error: error.message });
    }
};


// Obtener registros por fecha de alimento con las relaciones
export const getQueryAlimento = async (req, res) => {
    const { Fec_Alimentacion } = req.params; // Fecha de alimentación a consultar

    if (!Fec_Alimentacion || !Fec_Alimentacion.length) {
        logger.warn('Fec_Alimentacion es requerido');
        return res.status(400).json({ message: 'Fec_Alimentacion es requerido' });
    }

    try {
        const alimento = await alimentacionModel.findAll({
            where: { Fec_Alimentacion: Fec_Alimentacion }
        });

        if (alimento.length > 0) {
            logger.info(`Consulta de alimentos con fecha ${Fec_Alimentacion} realizada exitosamente`);
            return res.status(200).json(alimento[0]); // 200 OK
        } else {
            logger.warn(`No se encontraron alimentos con fecha ${Fec_Alimentacion}`);
            return res.status(404).json({ message: 'No se encontraron registros para la fecha especificada' }); // 404 Not Found
        }
    } catch (error) {
        logger.error('Error al consultar alimentos por fecha:', error);
        return res.status(500).json({ message: 'Error al consultar alimentos', error: error.message }); // 500 Internal Server Error
    }
};
