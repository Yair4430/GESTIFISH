import { Op } from 'sequelize';
import CosechaModel from '../models/cosechaModel.js';
import ResponsableModel from '../models/responsableModel.js';
import SiembraModel from '../models/siembraModel.js';
import logger from '../middleware/logger.js';

// Obtener todos los registros de cosecha
export const getAllCosecha = async (req, res) => {
    logger.info('Intentando obtener todos los registros de cosecha');
    try {
        const cosechas = await CosechaModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (cosechas.length > 0) {
            logger.info('Todos los registros de cosecha obtenidos exitosamente');
            return res.status(200).json(cosechas);
        }

        res.status(400).json({ message: 'No hay registros de cosecha' });
    } catch (error) {
        logger.error('Error al obtener todos los registros de cosecha:', error);
        res.status(500).json({ message: 'Error al obtener los registros de cosecha' });
    }
};

// Obtener un registro de cosecha por ID
export const getCosechaById = async (req, res) => {
    const { Id_Cosecha } = req.params;

    if (!Id_Cosecha) {
        logger.warn('Id_Cosecha es requerido');
        return res.status(400).json({ message: 'Id_Cosecha es requerido' });
    }

    try {
        const cosecha = await CosechaModel.findByPk(Id_Cosecha, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (cosecha) {
            return res.status(200).json(cosecha);
        } else {
            logger.warn(`Registro de cosecha con ID ${Id_Cosecha} no encontrado`);
            return res.status(404).json({ message: "Registro de cosecha no encontrado." });
        }
    } catch (error) {
        logger.error("Error al recuperar registro de cosecha:", error.message);
        return res.status(500).json({ message: "Error al recuperar el registro de cosecha." });
    }
};

// Obtener registros de cosecha por fecha
export const getCosechaByFecha = async (req, res) => {
    const { Fec_Cosecha } = req.params;

    if (!Fec_Cosecha) {
        logger.warn('Fecha es requerida');
        return res.status(400).json({ message: 'Fecha es requerida' });
    }

    try {
        const cosechas = await CosechaModel.findAll({
            where: {
                Fec_Cosecha: {
                    [Op.eq]: Fec_Cosecha
                }
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (cosechas.length > 0) {
            return res.status(200).json(cosechas);
        } else {
            logger.warn(`No se encontraron registros de cosecha para la fecha ${Fec_Cosecha}`);
            return res.status(404).json({ message: "No se encontraron registros de cosecha." });
        }
    } catch (error) {
        logger.error("Error al recuperar registros de cosecha por fecha:", error.message);
        return res.status(500).json({ message: "Error al recuperar registros de cosecha por fecha." });
    }
};

// Crear un registro de cosecha
export const createCosecha = async (req, res) => {
    const { Fec_Cosecha, Can_Peces, Pes_Eviscerado, Pes_Viscerado, Por_Visceras, Id_Responsable, Id_Siembra, Hor_Cosecha, Vlr_Cosecha, Obs_Cosecha } = req.body;

    if (!Fec_Cosecha || !Can_Peces || !Pes_Eviscerado || !Pes_Viscerado || !Por_Visceras || !Id_Responsable || !Id_Siembra || !Hor_Cosecha || !Vlr_Cosecha) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevaCosecha = await CosechaModel.create({
            Fec_Cosecha,
            Can_Peces,
            Pes_Eviscerado,
            Pes_Viscerado,
            Por_Visceras,
            Id_Responsable,
            Id_Siembra,
            Hor_Cosecha,
            Vlr_Cosecha,
            Obs_Cosecha
        });
        logger.info('Registro de cosecha creado exitosamente');
        return res.status(201).json(nuevaCosecha);
    } catch (error) {
        logger.error('Error al crear registro de cosecha:', error);
        return res.status(500).json({ message: 'Error al crear registro de cosecha', error: error.message });
    }
};

// Actualizar un registro de cosecha
export const updateCosecha = async (req, res) => {
    const { Id_Cosecha } = req.params;
    const { Fec_Cosecha, Can_Peces, Pes_Eviscerado, Pes_Viscerado, Por_Visceras, Id_Responsable, Id_Siembra, Hor_Cosecha, Vlr_Cosecha, Obs_Cosecha } = req.body;

    if (!Id_Cosecha) {
        logger.warn('Id_Cosecha es requerido');
        return res.status(400).json({ message: 'Id_Cosecha es requerido' });
    }

    if (!Fec_Cosecha || !Can_Peces || !Pes_Eviscerado || !Pes_Viscerado || !Por_Visceras || !Id_Responsable || !Id_Siembra || !Hor_Cosecha || !Vlr_Cosecha) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const cosecha = await CosechaModel.findByPk(Id_Cosecha);
        if (cosecha) {
            await cosecha.update({
                Fec_Cosecha,
                Can_Peces,
                Pes_Eviscerado,
                Pes_Viscerado,
                Por_Visceras,
                Id_Responsable,
                Id_Siembra,
                Hor_Cosecha,
                Vlr_Cosecha,
                Obs_Cosecha
            });
            logger.info(`Registro de cosecha con ID ${Id_Cosecha} actualizado exitosamente`);
            return res.status(200).json(cosecha);
        } else {
            logger.warn(`Registro de cosecha con ID ${Id_Cosecha} no encontrado`);
            return res.status(404).json({ message: 'Registro de cosecha no encontrado' });
        }
    } catch (error) {
        logger.error('Error al actualizar registro de cosecha:', error);
        return res.status(500).json({ message: 'Error al actualizar registro de cosecha', error: error.message });
    }
};

// Borrar un registro de cosecha
export const deleteCosecha = async (req, res) => {
    const { Id_Cosecha } = req.params;

    if (!Id_Cosecha) {
        logger.warn('Id_Cosecha es requerido');
        return res.status(400).json({ message: 'Id_Cosecha es requerido' });
    }

    try {
        const cosecha = await CosechaModel.findByPk(Id_Cosecha);
        if (cosecha) {
            await cosecha.destroy();
            logger.info(`Registro de cosecha con ID ${Id_Cosecha} eliminado exitosamente`);
            return res.status(200).json({ message: 'Registro de cosecha eliminado' });
        } else {
            logger.warn(`Registro de cosecha con ID ${Id_Cosecha} no encontrado`);
            return res.status(404).json({ message: 'Registro de cosecha no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar registro de cosecha:', error);
        return res.status(500).json({ message: 'Error al eliminar registro de cosecha', error: error.message });
    }
};
