import { Op } from 'sequelize';
import MortalidadModel from '../models/mortalidadModel.js';
import ResponsableModel from '../models/responsableModel.js';
import SiembraModel from '../models/siembraModel.js';
import logger from '../middleware/logger.js';

// Obtener todos los registros de mortalidad
export const getAllMortalidad = async (req, res) => {
    logger.info('Intentando obtener todos los registros de mortalidad');
    try {
        const mortalidad = await MortalidadModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (mortalidad.length > 0) {
            logger.info('Todos los registros de mortalidad obtenidos exitosamente');
            return res.status(200).json(mortalidad);
        }

        res.status(400).json({ message: 'No hay registros de mortalidad' });
    } catch (error) {
        logger.error('Error al obtener todos los registros de mortalidad:', error);
        res.status(500).json({ message: 'Error al obtener los registros de mortalidad' });
    }
};

// Obtener un registro de mortalidad por ID
export const getMortalidadById = async (req, res) => {
    const { Id_Mortalidad } = req.params;

    if (!Id_Mortalidad) {
        logger.warn('Id_Mortalidad es requerido');
        return res.status(400).json({ message: 'Id_Mortalidad es requerido' });
    }

    try {
        const mortalidad = await MortalidadModel.findByPk(Id_Mortalidad, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (mortalidad) {
            return res.status(200).json(mortalidad);
        } else {
            logger.warn(`Registro de mortalidad con ID ${Id_Mortalidad} no encontrado`);
            return res.status(404).json({ message: "Registro de mortalidad no encontrado." });
        }
    } catch (error) {
        logger.error("Error al recuperar registro de mortalidad:", error.message);
        return res.status(500).json({ message: "Error al recuperar el registro de mortalidad." });
    }
};

// Obtener registros de mortalidad por fecha

export const getMortalidadByFecha = async (req, res) => {
    const { Fec_Mortalidad } = req.params;

    if (!Fec_Mortalidad) {
        logger.warn('Fecha es requerida');
        return res.status(400).json({ message: 'Fecha es requerida' });
    }

    try {
        const mortalidad = await MortalidadModel.findAll({
            where: {
                Fec_Mortalidad: {
                    [Op.eq]: Fec_Mortalidad
                }
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (mortalidad.length > 0) {
            return res.status(200).json(mortalidad);
        } else {
            logger.warn(`No se encontraron registros de mortalidad para la fecha ${Fec_Mortalidad}`);
            return res.status(404).json({ message: "No se encontraron registros de mortalidad." });
        }
    } catch (error) {
        logger.error("Error al recuperar registros de mortalidad por fecha:", error.message);
        return res.status(500).json({ message: "Error al recuperar registros de mortalidad por fecha." });
    }
};


// Crear un registro de mortalidad
export const createMortalidad = async (req, res) => {
    const { Fec_Mortalidad, Can_Peces, Mot_Mortalidad, Id_Responsable, Id_Siembra } = req.body;

    if (!Fec_Mortalidad || !Can_Peces || !Mot_Mortalidad || !Id_Responsable || !Id_Siembra) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevaMortalidad = await MortalidadModel.create({
            Fec_Mortalidad,
            Can_Peces,
            Mot_Mortalidad,
            Id_Responsable,
            Id_Siembra
        });
        logger.info('Registro de mortalidad creado exitosamente');
        return res.status(201).json(nuevaMortalidad);
    } catch (error) {
        logger.error('Error al crear registro de mortalidad:', error);
        return res.status(500).json({ message: 'Error al crear registro de mortalidad', error: error.message });
    }
};

// Actualizar un registro de mortalidad
export const updateMortalidad = async (req, res) => {
    const { Id_Mortalidad } = req.params;
    const { Fec_Mortalidad, Can_Peces, Mot_Mortalidad, Id_Responsable, Id_Siembra } = req.body;

    if (!Id_Mortalidad) {
        logger.warn('Id_Mortalidad es requerido');
        return res.status(400).json({ message: 'Id_Mortalidad es requerido' });
    }

    if (!Fec_Mortalidad || !Can_Peces || !Mot_Mortalidad || !Id_Responsable || !Id_Siembra) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const mortalidad = await MortalidadModel.findByPk(Id_Mortalidad);
        if (mortalidad) {
            await mortalidad.update({
                Fec_Mortalidad,
                Can_Peces,
                Mot_Mortalidad,
                Id_Responsable,
                Id_Siembra
            });
            logger.info(`Registro de mortalidad con ID ${Id_Mortalidad} actualizado exitosamente`);
            return res.status(200).json(mortalidad);
        } else {
            logger.warn(`Registro de mortalidad con ID ${Id_Mortalidad} no encontrado`);
            return res.status(404).json({ message: 'Registro de mortalidad no encontrado' });
        }
    } catch (error) {
        logger.error('Error al actualizar registro de mortalidad:', error);
        return res.status(500).json({ message: 'Error al actualizar registro de mortalidad', error: error.message });
    }
};

// Borrar un registro de mortalidad
export const deleteMortalidad = async (req, res) => {
    const { Id_Mortalidad } = req.params;

    if (!Id_Mortalidad) {
        logger.warn('Id_Mortalidad es requerido');
        return res.status(400).json({ message: 'Id_Mortalidad es requerido' });
    }

    try {
        const mortalidad = await MortalidadModel.findByPk(Id_Mortalidad);
        if (mortalidad) {
            await mortalidad.destroy();
            logger.info(`Registro de mortalidad con ID ${Id_Mortalidad} eliminado exitosamente`);
            return res.status(200).json({ message: 'Registro de mortalidad eliminado' });
        } else {
            logger.warn(`Registro de mortalidad con ID ${Id_Mortalidad} no encontrado`);
            return res.status(404).json({ message: 'Registro de mortalidad no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar registro de mortalidad:', error);
        return res.status(500).json({ message: 'Error al eliminar registro de mortalidad', error: error.message });
    }
};
