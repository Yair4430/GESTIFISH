import TrasladoModel from '../models/trasladosModel.js';
import logger from '../middleware/logger.js';
import { ResponsableModel } from '../app.js';

// Obtener todos los traslados
export const getAllTraslados = async (req, res) => {
    logger.info('Intentando obtener todos los traslados');
    try {
        const traslados = await TrasladoModel.findAll({
            include: [{
                model: ResponsableModel,
                as: 'responsable',
            }]
        });

        if (traslados.length > 0) {
            logger.info('Todos los traslados obtenidos exitosamente');
            return res.status(200).json(traslados);
        }

        res.status(400).json({ message: 'No hay traslados' });
    } catch (error) {
        logger.error('Error al obtener todos los traslados:', error);
        console.error('Error al obtener todos los traslados:', error);
        res.status(500).json({ message: 'Error al obtener traslados' });
    }
};

// Obtener un traslado por ID
export const getTraslado = async (req, res) => {
    const { Id_Traslado } = req.params;

    if (!Id_Traslado) {
        logger.warn('Id_Traslado es requerido');
        return res.status(400).json({ message: 'Id_Traslado es requerido' });
    }

    try {
        const traslado = await TrasladoModel.findByPk(Id_Traslado, {
            include: [{
                model: ResponsableModel,
                as: 'responsable'
            }]
        });

        if (traslado) {
            return res.status(200).json(traslado);
        } else {
            logger.warn(`Traslado con ID ${Id_Traslado} no encontrado`);
            return res.status(404).json({ message: "Traslado no encontrado." });
        }
    } catch (error) {
        logger.error("Error al recuperar traslado:", error.message);
        return res.status(500).json({ message: "Error al recuperar el traslado." });
    }
};

// Obtener traslados por fecha
export const getTrasladosByFecha = async (req, res) => {
    const { fecha } = req.params;

    if (!fecha) {
        logger.warn('Fecha es requerida');
        return res.status(400).json({ message: 'Fecha es requerida' });
    }

    try {
        const traslados = await TrasladoModel.findAll({
            where: {
                Fec_Traslado: fecha
            },
            include: [{
                model: ResponsableModel,
                as: 'responsable'
            }]
        });

        if (traslados.length > 0) {
            return res.status(200).json(traslados);
        } else {
            logger.warn(`No se encontraron traslados para la fecha ${fecha}`);
            return res.status(404).json({ message: "No se encontraron traslados." });
        }
    } catch (error) {
        logger.error("Error al recuperar traslados por fecha:", error.message);
        return res.status(500).json({ message: "Error al recuperar traslados por fecha." });
    }
};

// Crear un traslado
export const createTraslado = async (req, res) => {
    const { Fec_Traslado, Can_Peces, Id_Responsable, Obs_Traslado, Hor_Traslado } = req.body;

    if (!Fec_Traslado || !Can_Peces || !Id_Responsable || !Obs_Traslado || !Hor_Traslado) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevoTraslado = await TrasladoModel.create({
            Fec_Traslado,
            Can_Peces,
            Id_Responsable,
            Obs_Traslado,
            Hor_Traslado
        });
        logger.info('Traslado creado exitosamente');
        return res.status(201).json(nuevoTraslado);
    } catch (error) {
        logger.error('Error al crear traslado:', error);
        console.error('Error al crear traslado:', error);
        return res.status(500).json({ message: 'Error al crear traslado', error: error.message });
    }
};

// Actualizar un traslado
export const updateTraslado = async (req, res) => {
    const { Id_Traslado } = req.params;
    const { Fec_Traslado, Can_Peces, Id_Responsable, Obs_Traslado, Hor_Traslado } = req.body;

    if (!Id_Traslado) {
        logger.warn('Id_Traslado es requerido');
        return res.status(400).json({ message: 'Id_Traslado es requerido' });
    }

    if (!Fec_Traslado || !Can_Peces || !Id_Responsable || !Obs_Traslado || !Hor_Traslado) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const traslado = await TrasladoModel.findByPk(Id_Traslado);
        if (traslado) {
            await traslado.update({
                Fec_Traslado,
                Can_Peces,
                Id_Responsable,
                Obs_Traslado,
                Hor_Traslado
            });
            logger.info(`Traslado con ID ${Id_Traslado} actualizado exitosamente`);
            return res.status(200).json(traslado);
        } else {
            logger.warn(`Traslado con ID ${Id_Traslado} no encontrado`);
            return res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error('Error al actualizar traslado:', error);
        console.error('Error al actualizar traslado:', error);
        return res.status(500).json({ message: 'Error al actualizar traslado', error: error.message });
    }
};

// Borrar un traslado
export const deleteTraslado = async (req, res) => {
    const { Id_Traslado } = req.params;

    if (!Id_Traslado) {
        logger.warn('Id_Traslado es requerido');
        return res.status(400).json({ message: 'Id_Traslado es requerido' });
    }

    try {
        const traslado = await TrasladoModel.findByPk(Id_Traslado);
        if (traslado) {
            await traslado.destroy();
            logger.info(`Traslado con ID ${Id_Traslado} eliminado exitosamente`);
            return res.status(200).json({ message: 'Traslado eliminado' });
        } else {
            logger.warn(`Traslado con ID ${Id_Traslado} no encontrado`);
            return res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar traslado:', error);
        console.error('Error al eliminar traslado:', error);
        return res.status(500).json({ message: 'Error al eliminar traslado', error: error.message });
    }
};
