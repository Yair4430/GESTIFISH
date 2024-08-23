import { Op } from 'sequelize';
import AlimentacionModel from '../models/alimentacionModel.js';
import ResponsableModel from '../models/responsableModel.js';
import SiembraModel from '../models/siembraModel.js';
import logger from '../middleware/logger.js';

// Obtener todos los registros de alimentación
export const getAllAlimentacion = async (req, res) => {
    logger.info('Intentando obtener todos los registros de alimentación');
    try {
        const alimentacion = await AlimentacionModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (alimentacion.length > 0) {
            logger.info('Todos los registros de alimentación obtenidos exitosamente');
            return res.status(200).json(alimentacion);
        }

        res.status(400).json({ message: 'No hay registros de alimentación' });
    } catch (error) {
        logger.error('Error al obtener todos los registros de alimentación:', error);
        res.status(500).json({ message: 'Error al obtener los registros de alimentación' });
    }
};

// Obtener un registro de alimentación por ID
export const getAlimentacionById = async (req, res) => {
    const { Id_Alimentacion } = req.params;

    if (!Id_Alimentacion) {
        logger.warn('Id_Alimentacion es requerido');
        return res.status(400).json({ message: 'Id_Alimentacion es requerido' });
    }

    try {
        const alimentacion = await AlimentacionModel.findByPk(Id_Alimentacion, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (alimentacion) {
            return res.status(200).json(alimentacion);
        } else {
            logger.warn(`Registro de alimentación con ID ${Id_Alimentacion} no encontrado`);
            return res.status(404).json({ message: "Registro de alimentación no encontrado." });
        }
    } catch (error) {
        logger.error("Error al recuperar registro de alimentación:", error.message);
        return res.status(500).json({ message: "Error al recuperar el registro de alimentación." });
    }
};

// Obtener registros de alimentación por fecha
export const getAlimentacionByFecha = async (req, res) => {
    const { Fec_Alimentacion } = req.params;

    if (!Fec_Alimentacion) {
        logger.warn('Fecha es requerida');
        return res.status(400).json({ message: 'Fecha es requerida' });
    }

    try {
        const alimentacion = await AlimentacionModel.findAll({
            where: {
                Fec_Alimentacion: {
                    [Op.eq]: Fec_Alimentacion
                }
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (alimentacion.length > 0) {
            return res.status(200).json(alimentacion);
        } else {
            logger.warn(`No se encontraron registros de alimentación para la fecha ${Fec_Alimentacion}`);
            return res.status(404).json({ message: "No se encontraron registros de alimentación." });
        }
    } catch (error) {
        logger.error("Error al recuperar registros de alimentación por fecha:", error.message);
        return res.status(500).json({ message: "Error al recuperar registros de alimentación por fecha." });
    }
};

// Crear un registro de alimentación
export const createAlimentacion = async (req, res) => {
    const { Fec_Alimentacion, Can_RacionKg, Id_Siembra, Id_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion } = req.body;

    if (!Fec_Alimentacion || !Can_RacionKg || !Id_Siembra || !Id_Responsable || !Tip_Alimento || !Hor_Alimentacion || !Vlr_Alimentacion) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevaAlimentacion = await AlimentacionModel.create({
            Fec_Alimentacion,
            Can_RacionKg,
            Id_Siembra,
            Id_Responsable,
            Tip_Alimento,
            Hor_Alimentacion,
            Vlr_Alimentacion
        });
        logger.info('Registro de alimentación creado exitosamente');
        return res.status(201).json(nuevaAlimentacion);
    } catch (error) {
        logger.error('Error al crear registro de alimentación:', error);
        return res.status(500).json({ message: 'Error al crear registro de alimentación', error: error.message });
    }
};

// Actualizar un registro de alimentación
export const updateAlimentacion = async (req, res) => {
    const { Id_Alimentacion } = req.params;
    const { Fec_Alimentacion, Can_RacionKg, Id_Siembra, Id_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion } = req.body;

    if (!Id_Alimentacion) {
        logger.warn('Id_Alimentacion es requerido');
        return res.status(400).json({ message: 'Id_Alimentacion es requerido' });
    }

    if (!Fec_Alimentacion || !Can_RacionKg || !Id_Siembra || !Id_Responsable || !Tip_Alimento || !Hor_Alimentacion || !Vlr_Alimentacion) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const alimentacion = await AlimentacionModel.findByPk(Id_Alimentacion);
        if (alimentacion) {
            await alimentacion.update({
                Fec_Alimentacion,
                Can_RacionKg,
                Id_Siembra,
                Id_Responsable,
                Tip_Alimento,
                Hor_Alimentacion,
                Vlr_Alimentacion
            });
            logger.info(`Registro de alimentación con ID ${Id_Alimentacion} actualizado exitosamente`);
            return res.status(200).json(alimentacion);
        } else {
            logger.warn(`Registro de alimentación con ID ${Id_Alimentacion} no encontrado`);
            return res.status(404).json({ message: 'Registro de alimentación no encontrado' });
        }
    } catch (error) {
        logger.error('Error al actualizar registro de alimentación:', error);
        return res.status(500).json({ message: 'Error al actualizar registro de alimentación', error: error.message });
    }
};

// Borrar un registro de alimentación
export const deleteAlimentacion = async (req, res) => {
    const { Id_Alimentacion } = req.params;

    if (!Id_Alimentacion) {
        logger.warn('Id_Alimentacion es requerido');
        return res.status(400).json({ message: 'Id_Alimentacion es requerido' });
    }

    try {
        const alimentacion = await AlimentacionModel.findByPk(Id_Alimentacion);
        if (alimentacion) {
            await alimentacion.destroy();
            logger.info(`Registro de alimentación con ID ${Id_Alimentacion} eliminado exitosamente`);
            return res.status(200).json({ message: 'Registro de alimentación eliminado' });
        } else {
            logger.warn(`Registro de alimentación con ID ${Id_Alimentacion} no encontrado`);
            return res.status(404).json({ message: 'Registro de alimentación no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar registro de alimentación:', error);
        return res.status(500).json({ message: 'Error al eliminar registro de alimentación', error: error.message });
    }
};
