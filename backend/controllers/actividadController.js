import { Sequelize, Op } from "sequelize";
import ActividadModel from "../models/actividadModel.js";
import logger from "../middleware/logger.js";
import { ResponsableModel, EstanqueModel } from "../app.js";

// Obtener todas las actividades
export const getAllActividad = async (req, res) => {
    try {
        const actividades = await ActividadModel.findAll({
            include: [
                {
                    model: ResponsableModel,
                    as: 'responsable'
                },
                {
                    model: EstanqueModel,
                    as: 'estanque'
                }
            ]
        });
        logger.info('Todas las actividades obtenidas exitosamente');
        res.json(actividades);
    } catch (error) {
        logger.error("Error al obtener todas las actividades:", error);
        res.status(500).json({ message: error.message });
    }
};

// esto 
// Obtener una actividad por ID
export const getActividad = async (req, res) => {
    const { Id_Actividad } = req.params;

    if (!Id_Actividad) {
        logger.warn('Id_Actividad es requerido');
        return res.status(400).json({ message: 'Id_Actividad es requerido' });
    }

    try {
        const actividad = await ActividadModel.findByPk(Id_Actividad, {
            include: [
                {
                    model: ResponsableModel,
                    as: 'responsable'
                },
                {
                    model: EstanqueModel,
                    as: 'estanque'
                }
            ]
        });

        if (actividad) {
            logger.info(`Actividad con ID ${Id_Actividad} obtenida exitosamente`);
            return res.status(200).json(actividad);
        } else {
            logger.warn(`Actividad con ID ${Id_Actividad} no encontrada`);
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
    } catch (error) {
        logger.error('Error al obtener actividad:', error);
        console.error('Error al obtener actividad:', error);
        return res.status(500).json({ message: 'Error al obtener actividad', error: error.message });
    }
};

// Crear una actividad
export const createActividad = async (req, res) => {
    const { Nom_Actividad, Des_Actividad, Id_Responsable, Fec_Actividad, Hor_Actividad, Fas_Produccion, Id_Estanque } = req.body;

    if (!Nom_Actividad || !Des_Actividad || !Id_Responsable || !Fec_Actividad || !Hor_Actividad || !Fas_Produccion || !Id_Estanque) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        console.log(req.body)
        const respuesta = await ActividadModel.create(req.body);
        logger.info('Datos enviados a la base de datos:', respuesta);

        if (respuesta.Id_Actividad) {
            logger.info(`Actividad con ID ${respuesta.Id_Actividad} creada exitosamente`);
            return res.status(201).json({ message: "¡Registro creado exitosamente!", data: respuesta });
        } else {
            logger.error('Error al crear el registro');
            return res.status(500).json({ message: "Error al crear el registro" });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            logger.error('Error de validación al crear actividad:', error);
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }

        logger.error('Error al crear actividad:', error);
        console.error('Error al crear actividad:', error);
        res.status(500).json({ message: 'Error al crear actividad', error: error.message });
    }
};

// Actualizar una actividad
export const updateActividad = async (req, res) => {
    
    const { Id_Actividad, Nom_Actividad, Des_Actividad, Id_Responsable, Fec_Actividad, Hor_Actividad, Fas_Produccion, Id_Estanque } = req.body;

    if (!Nom_Actividad || !Des_Actividad || !Id_Responsable || !Fec_Actividad || !Hor_Actividad || !Fas_Produccion || !Id_Estanque) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const actividad = await ActividadModel.findByPk(Id_Actividad);

        if (!actividad) {
            logger.warn(`Actividad con ID ${Id_Actividad} no encontrada`);
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        actividad.Nom_Actividad = Nom_Actividad;
        actividad.Des_Actividad = Des_Actividad;
        actividad.Id_Responsable = Id_Responsable;
        actividad.Fec_Actividad = Fec_Actividad;
        actividad.Hor_Actividad = Hor_Actividad;
        actividad.Fas_Produccion = Fas_Produccion;
        actividad.Id_Estanque = Id_Estanque;

        await actividad.save();

        logger.info(`Actividad con ID ${Id_Actividad} actualizada exitosamente`);
        return res.status(200).json({ message: '¡Registro actualizado exitosamente!', data: actividad });
    } catch (error) {
        logger.error('Error al actualizar actividad:', error);
        console.error('Error al actualizar actividad:', error);
        return res.status(500).json({ message: 'Error al actualizar actividad', error: error.message });
    }
};

// Borrar una actividad
export const deleteActividad = async (req, res) => {
    console.log(req.body)
    const { Id_Actividad } = req.params;

    try {
        const result = await ActividadModel.destroy({
            where: { Id_Actividad }
        });

        if (result) {
            logger.info(`Actividad con ID ${Id_Actividad} eliminada exitosamente`);
            return res.status(200).json({ message: 'Actividad eliminada exitosamente' });
        } else {
            logger.warn(`Actividad con ID ${Id_Actividad} no encontrada`);
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
    } catch (error) {
        logger.error('Error al eliminar actividad:', error);
        console.error('Error al eliminar actividad:', error);
        return res.status(500).json({ message: 'Error al eliminar actividad', error: error.message });
    }
};


export const getQueryActividad = async (req, res) => {
    const { FechaActividad } = req.params;

    if (!FechaActividad) {
        logger.info(`Consultando actividades con fecha ${FechaActividad}`);
        logger.warn('Fec_Actividad es requerido');
        return res.status(400).json({ message: 'Fec_Actividad es requerido' });
    }

    try {
        // Buscar actividades por fecha exacta
        const actividades = await ActividadModel.findAll({
            where: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('Fec_Actividad')),
                FechaActividad
            ),

            include: [
                {
                    model: ResponsableModel,
                    as: 'responsable'
                },
                {
                    model: EstanqueModel,
                    as: 'estanque'
                }]
        });

        if (actividades.length > 0) {
            logger.info(`Consulta de actividades con fecha ${FechaActividad} realizada exitosamente`);
            return res.status(200).json(actividades);
        } else {
            logger.warn(`No se encontraron actividades con fecha ${FechaActividad}`);
            return res.status(404).json({ message: 'No se encontraron actividades' });
        }
    } catch (error) {
        logger.error('Error al consultar actividad por fecha:', error);
        console.error('Error al consultar actividad por fecha:', error);
        return res.status(500).json({ message: 'Error al consultar actividad', error: error.message });
    }
};
