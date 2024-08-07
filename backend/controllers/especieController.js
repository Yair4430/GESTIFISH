import { Sequelize, Op } from "sequelize";
import EspecieModel from "../models/especieModel.js";
import logger from "../middleware/logger.js";

// Obtener todas las especies
export const getAllEspecies = async (req, res) => {
    try {
      const especies = await EspecieModel.findAll();
      res.json(especies);
    } catch (error) {
      logger.error("Error al obtener todas las especies:", error);
      res.status(500).json({ message: error.message });
    }
  };

// Obtener una especie por Id
export const getEspecie = async (req, res) => {
    const { Id_Especie } = req.params;
    try {
        const especie = await EspecieModel.findOne({
            where: { Id_Especie }
        });

        if (especie) {
            logger.info(`Especie con Id ${Id_Especie} obtenida exitosamente`);
            return res.status(200).json(especie);
        } else {
            logger.warn(`Especie con Id ${Id_Especie} no encontrada`);
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
    } catch (error) {
        logger.error('Error al obtener especie:', error);
        console.error('Error al obtener especie:', error);
        return res.status(500).json({ message: 'Error al obtener especie', error: error.message });
    }
};

// Crear una especie
export const createEspecie = async (req, res) => {
    const { Nom_Especie, Car_Especie, Tam_Promedio, Den_Especie } = req.body;
    const Img_Especie = req.file ? req.file.filename : null;

    if (!Nom_Especie || !Car_Especie || !Tam_Promedio || !Den_Especie) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const respuesta = await EspecieModel.create({
            Nom_Especie,
            Car_Especie,
            Img_Especie,
            Tam_Promedio,
            Den_Especie
        });

        logger.info('Datos enviados a la base de datos:', respuesta);

        if (respuesta.Id_Especie) {
            logger.info(`Especie con ID ${respuesta.Id_Especie} creada exitosamente`);
            return res.status(201).json({ message: "¡Registro creado exitosamente!", data: respuesta });
        } else {
            logger.error('Error al crear el registro');
            return res.status(500).json({ message: "Error al crear el registro" });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            logger.error('Error de validación al crear especie:', error);
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }

        logger.error('Error al crear especie:', error);
        console.error('Error al crear especie:', error);
        res.status(500).json({ message: 'Error al crear especie', error: error.message });
    }
};

// Actualizar una especie
export const updateEspecie = async (req, res) => {
    const { Id_Especie } = req.params;
    const { Nom_Especie, Car_Especie, Tam_Promedio, Den_Especie } = req.body;
    const Img_Especie = req.file ? req.file.filename : null;

    try {
        const especie = await EspecieModel.findOne({ where: { Id_Especie } });

        if (!especie) {
            logger.warn(`Especie con ID ${Id_Especie} no encontrada`);
            return res.status(404).json({ message: 'Especie no encontrada' });
        }

        // Actualiza solo los campos proporcionados
        if (Nom_Especie) especie.Nom_Especie = Nom_Especie;
        if (Car_Especie) especie.Car_Especie = Car_Especie;
        if (Tam_Promedio) especie.Tam_Promedio = Tam_Promedio;
        if (Den_Especie) especie.Den_Especie = Den_Especie;
        if (Img_Especie) especie.Img_Especie = Img_Especie;

        await especie.save();

        logger.info(`Especie con ID ${Id_Especie} actualizada exitosamente`);
        return res.status(200).json({ message: '¡Registro actualizado exitosamente!', data: especie });
    } catch (error) {
        logger.error('Error al actualizar especie:', error);
        console.error('Error al actualizar especie:', error);
        return res.status(500).json({ message: 'Error al actualizar especie', error: error.message });
    }
};


// Borrar una especie
export const deleteEspecie = async (req, res) => {
    const { Id_Especie } = req.params;

    try {
        const result = await EspecieModel.destroy({
            where: { Id_Especie }
        });

        if (result) {
            logger.info(`Especie con ID ${Id_Especie} eliminada exitosamente`);
            return res.status(200).json({ message: 'Especie eliminada exitosamente' });
        } else {
            logger.warn(`Especie con ID ${Id_Especie} no encontrada`);
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
    } catch (error) {
        logger.error('Error al eliminar especie:', error);
        console.error('Error al eliminar especie:', error);
        return res.status(500).json({ message: 'Error al eliminar especie', error: error.message });
    }
};


// Consultar especie por nombre usando like
export const getQueryEspecie = async (req, res) => {
    const { Nom_Especie } = req.params;
    logger.info(`Consulta de Especie: ${Nom_Especie}`);
    console.log("Nom_Especie recibido:", Nom_Especie);

    if (!Nom_Especie) {
        logger.warn('Nom_Especie es requerido');
        return res.status(400).json({ message: "Nom_Especie es requerido" });
    }

    try {
        const especies = await EspecieModel.findAll({
            where: {
                Nom_Especie: {
                    [Op.like]: `%${Nom_Especie}%`
                }
            }
        });

        logger.info(`Consulta de especies con nombre ${Nom_Especie} realizada exitosamente`);
        res.json(especies);
    } catch (error) {
        logger.error("Error al consultar Especie:", error);
        console.error("Error al consultar especie por nombre:", error);
        res.status(500).json({ message: error.message });
    }
};
