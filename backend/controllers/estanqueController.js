import { Sequelize, Op } from "sequelize";
import EstanqueModel from "../models/estanqueModel.js";
import logger from "../middleware/logger.js";

// Obtener todos los estanques
export const getAllEstanque = async (req, res) => {
    try {
        const estanques = await EstanqueModel.findAll();

        if (estanques.length > 0) {
            logger.info('Todos los estanques obtenidos exitosamente');
            return res.status(200).json(estanques);
        }

        res.status(400).json({ message: 'No hay estanques' });
    } catch (error) {
        logger.error("Error al obtener todos los estanques:", error);
        console.error("Error al obtener todos los estanques:", error);
        res.status(500).json({ message: 'Error al obtener estanques' });
    }
};

// Obtener un estanque por ID
export const getEstanque = async (req, res) => {
    const { Id_Estanque } = req.params;

    if (!Id_Estanque) {
        logger.warn('Id_Estanque es requerido');
        return res.status(400).json({ message: 'Id_Estanque es requerido' });
    }

    try {
        const estanque = await EstanqueModel.findOne({
            where: { Id_Estanque }
        });

        if (estanque) {
            logger.info(`Estanque con ID ${Id_Estanque} obtenido exitosamente`);
            return res.status(200).json(estanque);
        } else {
            logger.warn(`Estanque con ID ${Id_Estanque} no encontrado`);
            return res.status(404).json({ message: 'Estanque no encontrado' });
        }
    } catch (error) {
        logger.error('Error al obtener estanque:', error);
        console.error('Error al obtener estanque:', error);
        return res.status(500).json({ message: 'Error al obtener estanque', error: error.message });
    }
};

// Crear un estanque
export const createEstanque = async (req, res) => {
    const { Id_Estanque, Nom_Estanque, Esp_Agua, Tip_Estanque, Lar_Estanque, Anc_Estanque, Des_Estanque, Rec_Agua } = req.body;
    const Img_Estanque = req.file ? req.file.filename : null;

    if (!Nom_Estanque || !Esp_Agua || !Tip_Estanque || !Lar_Estanque || !Anc_Estanque || !Des_Estanque) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const respuesta = await EstanqueModel.create({
            Id_Estanque,
            Nom_Estanque,
            Esp_Agua,
            Tip_Estanque,
            Lar_Estanque,
            Anc_Estanque,
            Des_Estanque,
            Img_Estanque,
            Rec_Agua
        });

        logger.info('Datos enviados a la base de datos:', respuesta);

        if (respuesta.Id_Estanque) {
            logger.info(`Estanque con ID ${respuesta.Id_Estanque} creado exitosamente`);
            return res.status(201).json({ message: "¡Registro creado exitosamente!", data: respuesta });
        } else {
            logger.error('Error al crear el registro');
            return res.status(500).json({ message: "Error al crear el registro" });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            logger.error('Error de validación al crear estanque:', error);
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }

        logger.error('Error al crear estanque:', error);
        console.error('Error al crear estanque:', error);
        res.status(500).json({ message: 'Error al crear estanque', error: error.message });
    }
};

// Actualizar un estanque
export const updateEstanque = async (req, res) => {
    const { Id_Estanque, Nom_Estanque, Esp_Agua, Tip_Estanque, Lar_Estanque, Anc_Estanque, Des_Estanque, Rec_Agua } = req.body;
    const foto = req.file ? req.file.filename : null;

    if (!Id_Estanque || !Nom_Estanque || !Esp_Agua || !Tip_Estanque || !Lar_Estanque || !Anc_Estanque || !Des_Estanque || !Rec_Agua) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const estanque = await EstanqueModel.findByPk(Id_Estanque);

        if (!estanque) {
            logger.warn(`Estanque con ID ${Id_Estanque} no encontrado`);
            return res.status(404).json({ message: 'Estanque no encontrado' });
        }

        // Actualizar los campos
        estanque.Nom_Estanque = Nom_Estanque;
        estanque.Esp_Agua = Esp_Agua;
        estanque.Tip_Estanque = Tip_Estanque;
        estanque.Lar_Estanque = Lar_Estanque;
        estanque.Anc_Estanque = Anc_Estanque;
        estanque.Des_Estanque = Des_Estanque;
        estanque.Img_Estanque = foto || estanque.Img_Estanque; // Usar la imagen nueva si existe, de lo contrario mantener la actual
        estanque.Rec_Agua = Rec_Agua;

        await estanque.save();

        logger.info(`Estanque con ID ${Id_Estanque} actualizado exitosamente`);
        return res.status(200).json({ message: '¡Registro actualizado exitosamente!', data: estanque });
    } catch (error) {
        logger.error('Error al actualizar estanque:', error);
        console.error('Error al actualizar estanque:', error);
        return res.status(500).json({ message: 'Error al actualizar estanque', error: error.message });
    }
};

// Borrar un estanque
export const deleteEstanque = async (req, res) => {
    const { Id_Estanque } = req.params;

    if (!Id_Estanque) {
        logger.warn('Id_Estanque es requerido');
        return res.status(400).json({ message: 'Id_Estanque es requerido' });
    }

    try {
        const result = await EstanqueModel.destroy({
            where: { Id_Estanque }
        });

        if (result) {
            logger.info(`Estanque con ID ${Id_Estanque} eliminado exitosamente`);
            return res.status(200).json({ message: 'Estanque eliminado exitosamente' });
        } else {
            logger.warn(`Estanque con ID ${Id_Estanque} no encontrado`);
            return res.status(404).json({ message: 'Estanque no encontrado' });
        }
    } catch (error) {
        logger.error('Error al eliminar estanque:', error);
        console.error('Error al eliminar estanque:', error);
        return res.status(500).json({ message: 'Error al eliminar estanque', error: error.message });
    }
};

// Consultar estanque por ID usando like
export const getQueryEstanque = async (req, res) => {
    const { Id_Estanque } = req.params;
    logger.info(`Consulta de Estanque: ${req.params.Id_Estanque}`);

    if (!Id_Estanque) {
        logger.warn('Id_Estanque es requerido');
        return res.status(400).json({ message: "Id_Estanque es requerido" });
    }

    try {
        const estanque = await EstanqueModel.findAll({
            where: {
                Id_Estanque: {
                    [Op.like]: `%${Id_Estanque}%`
                }
            }
        });

        logger.info(`Consulta de estanque con ID ${Id_Estanque} realizada exitosamente`);
        return res.json(estanque);
    } catch (error) {
        logger.error("Error al consultar Estanque:", error);
        console.error("Error al consultar estanque por ID:", error);
        return res.status(500).json({ message: error.message });
    }
};
