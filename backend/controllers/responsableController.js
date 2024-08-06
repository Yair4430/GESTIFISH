import { Sequelize, Op } from "sequelize";
import ResponsableModel from "../models/responsableModel.js";
import logger from "../middleware/logger.js";

// Obtener todos los responsables
export const getAllResponsable = async (req, res) => {
    try {
        const responsables = await ResponsableModel.findAll();
        logger.info('Todos los responsables obtenidos exitosamente');
        res.json(responsables);
    } catch (error) {
        logger.error("Error al obtener todos los responsables:", error);
        console.error("Error al obtener todos los responsables:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener un responsable por ID
export const getResponsable = async (req, res) => {
    const { Id_Responsable } = req.params; // Adaptar el nombre del parámetro

    try {
        const responsable = await ResponsableModel.findOne({
            where: { Id_Responsable }
        });

        if (responsable) {
            logger.info(`Responsable con ID ${Id_Responsable} obtenido exitosamente`);
            return res.status(200).json(responsable);
        } else {
            logger.warn(`Responsable con ID ${Id_Responsable} no encontrado`);
            return res.status(404).json({ message: 'Responsable no encontrado' });
        }
    } catch (error) {
        logger.error('Error al obtener responsable:', error);
        console.error('Error al obtener responsable:', error);
        return res.status(500).json({ message: 'Error al obtener responsable', error: error.message });
    }
};

// Crear un responsable
export const createResponsable = async (req, res) => {
    const { Nom_Responsable, Ape_Responsable, Doc_Responsable, Tip_Responsable, Cor_Responsable, Num_Responsable } = req.body;

    if (!Nom_Responsable || !Ape_Responsable || !Doc_Responsable || !Tip_Responsable) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const respuesta = await ResponsableModel.create(req.body);
        logger.info('Datos enviados a la base de datos:', respuesta);

        if (respuesta.Id_Responsable) {
            logger.info(`Responsable con ID ${respuesta.Id_Responsable} creado exitosamente`);
            return res.status(201).json({ message: "¡Registro creado exitosamente!", data: respuesta });
        } else {
            logger.error('Error al crear el registro');
            return res.status(500).json({ message: "Error al crear el registro" });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            logger.error('Error de validación al crear responsable:', error);
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }

        logger.error('Error al crear responsable:', error);
        console.error('Error al crear responsable:', error);
        res.status(500).json({ message: 'Error al crear responsable', error: error.message });
    }
};

// Actualizar un responsable
export const updateResponsable = async (req, res) => {
    const { Id_Responsable, Nom_Responsable, Ape_Responsable, Doc_Responsable, Tip_Responsable, Cor_Responsable, Num_Responsable } = req.body;

    if (!Id_Responsable || !Nom_Responsable || !Ape_Responsable || !Doc_Responsable || !Tip_Responsable || !Cor_Responsable || !Num_Responsable) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const responsable = await ResponsableModel.findByPk(Id_Responsable);

        if (!responsable) {
            logger.warn(`Responsable con ID ${Id_Responsable} no encontrado`);
            return res.status(404).json({ message: 'Responsable no encontrado' });
        }

        responsable.Nom_Responsable = Nom_Responsable;
        responsable.Ape_Responsable = Ape_Responsable;
        responsable.Doc_Responsable = Doc_Responsable;
        responsable.Tip_Responsable = Tip_Responsable;
        responsable.Cor_Responsable = Cor_Responsable;
        responsable.Num_Responsable = Num_Responsable;

        await responsable.save();

        logger.info(`Responsable con ID ${Id_Responsable} actualizado exitosamente`);
        return res.status(200).json({ message: '¡Registro actualizado exitosamente!', data: responsable });
    } catch (error) {
        logger.error('Error al actualizar responsable:', error);
        console.error('Error al actualizar responsable:', error);
        return res.status(500).json({ message: 'Error al actualizar responsable', error: error.message });
    }
};

// Borrar un responsable
export const deleteResponsable = async (req, res) => {
    const { Id_Responsable } = req.params;

    try {
        const result = await ResponsableModel.destroy({
            where: { Id_Responsable }
        });

        if (result) {
            logger.info(`Responsable con ID ${Id_Responsable} eliminado exitosamente`);
            return res.status(200).json({ message: 'Responsable eliminado exitosamente' });
        } else {
            logger.warn(`Responsable con ID ${Id_Responsable} no encontrado`);
            return res.status(404).json({ message: 'Responsable no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar responsable:', error);
        console.error('Error al eliminar responsable:', error);
        return res.status(500).json({ message: 'Error al eliminar responsable', error: error.message });
    }
};

// Consultar responsable por documento
export const getQueryResponsable = async (req, res) => {
    const { Doc_Responsable } = req.params;

    if (!Doc_Responsable) {
        logger.warn('Doc_Responsable es requerido');
        return res.status(400).json({ message: 'Doc_Responsable es requerido' });
    }

    try {
        const responsables = await ResponsableModel.findAll({
            where: { Doc_Responsable: { [Op.like]: `%${Doc_Responsable}%` } }
        });

        if (responsables.length > 0) {
            logger.info(`Consulta de responsables con documento ${Doc_Responsable} realizada exitosamente`);
            return res.status(200).json(responsables);
        } else {
            logger.warn(`No se encontraron responsables con documento ${Doc_Responsable}`);
            return res.status(404).json({ message: 'No se encontraron responsables' });
        }
    } catch (error) {
        logger.error('Error al consultar responsable por documento:', error);
        console.error('Error al consultar responsable por documento:', error);
        return res.status(500).json({ message: 'Error al consultar responsable', error: error.message });
    }
};
