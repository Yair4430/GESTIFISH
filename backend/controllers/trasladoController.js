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
        logger.info('Todos los traslados obtenidos exitosamente');
        res.json(traslados);
    } catch (error) {
        logger.error('Error al obtener todos los traslados:', error);
        console.error('Error al obtener todos los traslados:', error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener un traslado por ID
export const getTraslado = async (req, res) => {
    try {
        const traslado = await TrasladoModel.findByPk(req.params.Id_Traslado, {
            include: [{
                model: ResponsableModel,
                as: 'responsable'
            }]
        });
        if (traslado) {
            res.status(200).json(traslado);
        } else {
            res.status(404).json({ message: "Traslado no encontrado." });
        }
    } catch (error) {
        logger.error("Error fetching Traslado: ", error.message);
        res.status(500).json({ message: "Error al recuperar el traslado." });
    }
};

// Obtener traslados por fecha
export const getTrasladosByFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const traslados = await TrasladoModel.findAll({
            where: {
                Fec_Traslado: fecha
            },
            include: [
                {
                    model: ResponsableModel,
                    as: 'responsable'
                }
            ]
        });
        if (traslados.length > 0) {
            res.status(200).json(traslados);
        } else {
            res.status(404).json({ message: "Traslado no encontrado." });
        }
    } catch (error) {
        logger.error("Error al recuperar traslados por fecha:", error.message);
        res.status(500).json({ message: "Error al recuperar traslados por fecha." });
    }
};

// Crear un traslado
export const createTraslado = async (req, res) => {
    const { Fec_Traslado, Can_Peces, Id_Responsable, Obs_Traslado, Hor_Traslado } = req.body;
    try {
        const nuevoTraslado = await TrasladoModel.create({
            Fec_Traslado,
            Can_Peces,
            Id_Responsable,
            Obs_Traslado,
            Hor_Traslado
        });
        logger.info('Traslado creado exitosamente');
        res.status(201).json(nuevoTraslado);
    } catch (error) {
        logger.error('Error al crear traslado:', error);
        console.error('Error al crear traslado:', error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un traslado
export const updateTraslado = async (req, res) => {
    const { Id_Traslado } = req.params;
    const { Fec_Traslado, Can_Peces, Id_Responsable, Obs_Traslado, Hor_Traslado } = req.body;
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
            res.json(traslado);
        } else {
            logger.warn(`Traslado con ID ${Id_Traslado} no encontrado`);
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error('Error al actualizar traslado:', error);
        console.error('Error al actualizar traslado:', error);
        res.status(500).json({ message: error.message });
    }
};

// Borrar un traslado
export const deleteTraslado = async (req, res) => {
    const { Id_Traslado } = req.params;
    try {
        const traslado = await TrasladoModel.findByPk(Id_Traslado);
        if (traslado) {
            await traslado.destroy();
            logger.info(`Traslado con ID ${Id_Traslado} eliminado exitosamente`);
            res.json({ message: 'Traslado eliminado' });
        } else {
            logger.warn(`Traslado con ID ${Id_Traslado} no encontrado`);
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar traslado:', error);
        console.error('Error al eliminar traslado:', error);
        res.status(500).json({ message: error.message });
    }
};
