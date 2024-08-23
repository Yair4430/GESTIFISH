import { Op } from 'sequelize';
import MuestreoModel from '../models/muestreoModel.js';
import ResponsableModel from '../models/responsableModel.js';
import SiembraModel from '../models/siembraModel.js';
import logger from '../middleware/logger.js';

// Obtener todos los registros de muestreo
export const getAllMuestreo = async (req, res) => {
    logger.info('Intentando obtener todos los registros de muestreo');
    try {
        const muestreo = await MuestreoModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (muestreo.length > 0) {
            logger.info('Todos los registros de muestreo obtenidos exitosamente');
            return res.status(200).json(muestreo);
        }

        res.status(400).json({ message: 'No hay registros de muestreo' });
    } catch (error) {
        logger.error('Error al obtener todos los registros de muestreo:', error);
        res.status(500).json({ message: 'Error al obtener los registros de muestreo' });
    }
};

// Obtener un registro de muestreo por ID
export const getMuestreoById = async (req, res) => {
    const { Id_Muestreo } = req.params;

    if (!Id_Muestreo) {
        logger.warn('Id_Muestreo es requerido');
        return res.status(400).json({ message: 'Id_Muestreo es requerido' });
    }

    try {
        const muestreo = await MuestreoModel.findByPk(Id_Muestreo, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (muestreo) {
            return res.status(200).json(muestreo);
        } else {
            logger.warn(`Registro de muestreo con ID ${Id_Muestreo} no encontrado`);
            return res.status(404).json({ message: 'Registro de muestreo no encontrado.' });
        }
    } catch (error) {
        logger.error('Error al recuperar registro de muestreo:', error.message);
        return res.status(500).json({ message: 'Error al recuperar el registro de muestreo.' });
    }
};

// Obtener registros de muestreo por fecha
export const getMuestreoByFecha = async (req, res) => {
    const { Fec_Muestreo } = req.params;

    if (!Fec_Muestreo) {
        logger.warn('Fecha es requerida');
        return res.status(400).json({ message: 'Fecha es requerida' });
    }

    try {
        const muestreo = await MuestreoModel.findAll({
            where: {
                Fec_Muestreo: {
                    [Op.eq]: Fec_Muestreo
                }
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (muestreo.length > 0) {
            return res.status(200).json(muestreo);
        } else {
            logger.warn(`No se encontraron registros de muestreo para la fecha ${Fec_Muestreo}`);
            return res.status(404).json({ message: 'No se encontraron registros de muestreo.' });
        }
    } catch (error) {
        logger.error('Error al recuperar registros de muestreo por fecha:', error.message);
        return res.status(500).json({ message: 'Error al recuperar registros de muestreo por fecha.' });
    }
};

// Crear un registro de muestreo
export const createMuestreo = async (req, res) => {
    const { Fec_Muestreo, Num_Peces, Obs_Muestreo, Pes_Esperado, Id_Siembra, Id_Responsable, Hor_Muestreo, Pes_Promedio } = req.body;

    if (!Fec_Muestreo || !Num_Peces || !Obs_Muestreo || !Pes_Esperado || !Id_Siembra || !Id_Responsable || !Hor_Muestreo || !Pes_Promedio) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        console.log('Datos recibidos:', req.body);
        logger.info('Datos recibidos:', req.body);

        const nuevoMuestreo = await MuestreoModel.create({
            Fec_Muestreo,
            Num_Peces,
            Obs_Muestreo,
            Pes_Esperado: parseFloat(Pes_Esperado), // Asegúrate de convertir a FLOAT si el modelo lo requiere
            Id_Siembra,
            Id_Responsable,
            Hor_Muestreo,
            Pes_Promedio: parseFloat(Pes_Promedio) // Asegúrate de convertir a FLOAT si el modelo lo requiere
        });

        console.log('Registro de muestreo creado exitosamente:', nuevoMuestreo);
        logger.info('Registro de muestreo creado exitosamente');
        return res.status(201).json(nuevoMuestreo);
        
    } catch (error) {
        console.log(error)
        console.error('Error al crear registro de muestreo:', error);
        logger.error('Error al crear registro de muestreo:', error);
        return res.status(500).json({ message: 'Error al crear registro de muestreo', error: error.message });
    }
};




// Actualizar un registro de muestreo
export const updateMuestreo = async (req, res) => {
    const { Id_Muestreo } = req.params;
    const { Fec_Muestreo, Num_Peces, Obs_Muestreo, Pes_Esperado, Id_Siembra, Id_Responsable, Hor_Muestreo, Pes_Promedio } = req.body;

    if (!Id_Muestreo) {
        logger.warn('Id_Muestreo es requerido');
        return res.status(400).json({ message: 'Id_Muestreo es requerido' });
    }

    if (!Fec_Muestreo || !Num_Peces || !Obs_Muestreo || !Pes_Esperado || !Id_Siembra || !Id_Responsable || !Hor_Muestreo || !Pes_Promedio) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const muestreo = await MuestreoModel.findByPk(Id_Muestreo);
        if (muestreo) {
            await muestreo.update({
                Fec_Muestreo,
                Num_Peces,
                Obs_Muestreo,
                Pes_Esperado,
                Id_Siembra,
                Id_Responsable,
                Hor_Muestreo,
                Pes_Promedio
            });
            logger.info(`Registro de muestreo con ID ${Id_Muestreo} actualizado exitosamente`);
            return res.status(200).json(muestreo);
        } else {
            logger.warn(`Registro de muestreo con ID ${Id_Muestreo} no encontrado`);
            return res.status(404).json({ message: 'Registro de muestreo no encontrado' });
        }
    } catch (error) {
        logger.error('Error al actualizar registro de muestreo:', error);
        return res.status(500).json({ message: 'Error al actualizar registro de muestreo', error: error.message });
    }
};

// Borrar un registro de muestreo
export const deleteMuestreo = async (req, res) => {
    const { Id_Muestreo } = req.params;

    if (!Id_Muestreo) {
        logger.warn('Id_Muestreo es requerido');
        return res.status(400).json({ message: 'Id_Muestreo es requerido' });
    }

    try {
        const muestreo = await MuestreoModel.findByPk(Id_Muestreo);
        if (muestreo) {
            await muestreo.destroy();
            logger.info(`Registro de muestreo con ID ${Id_Muestreo} eliminado exitosamente`);
            return res.status(200).json({ message: 'Registro de muestreo eliminado' });
        } else {
            logger.warn(`Registro de muestreo con ID ${Id_Muestreo} no encontrado`);
            return res.status(404).json({ message: 'Registro de muestreo no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar registro de muestreo:', error);
        return res.status(500).json({ message: 'Error al eliminar registro de muestreo', error: error.message });
    }
};
