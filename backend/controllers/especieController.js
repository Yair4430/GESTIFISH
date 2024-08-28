import { Sequelize, Op } from "sequelize";
import EspecieModel from "../models/especieModel.js";

// Obtener todas las especies
export const getAllEspecies = async (req, res) => {
    try {
        // Buscar todas las especies en la base de datos
        const especies = await EspecieModel.findAll({});

        if (especies.length > 0) {
            // Si se encuentran especies, devolverlas con status 200
            res.status(200).json(especies);
            return;
        } 

        // Si no se encuentran especies, no devolver nada
        res.status(404).json({ message: 'No se encontraron especies' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al obtener todas las especies:', error);
        res.status(500).json({ message: 'Error al obtener especies', error: error.message });
    }
};

// Obtener una especie por ID
export const getEspecie = async (req, res) => {
    const { Id_Especie } = req.params;

    // Verificar que el ID de especie está presente
    if (!Id_Especie) {
        res.status(400).json({ message: 'Id_Especie es requerido' });
        return;
    }

    try {
        // Buscar la especie por su ID
        const especie = await EspecieModel.findByPk(Id_Especie);

        if (especie) {
            // Si se encuentra la especie, devolverla con status 200
            res.status(200).json(especie);
            return;
        }

        // Si la especie no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Especie no encontrada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al obtener especie:', error);
        res.status(500).json({ message: 'Error al obtener especie', error: error.message });
    }
};

// Consultar especie por nombre usando like
export const getQueryEspecie = async (req, res) => {
    const { Nom_Especie } = req.params;

    // Verificar que el nombre de la especie está presente
    if (!Nom_Especie) {
        res.status(400).json({ message: "Nom_Especie es requerido" });
        return;
    }

    try {
        // Buscar especies cuyo nombre coincida parcialmente con el proporcionado
        const especies = await EspecieModel.findAll({
            where: {
                Nom_Especie: {
                    [Op.like]: `%${Nom_Especie}%`
                }
            }
        });

        // Devolver las especies encontradas con status 200
        res.json(especies);
        return;
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error("Error al consultar especie por nombre:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener especies por fecha
export const getEspeciesByFecha = async (req, res) => {
    const { fecha } = req.params;

    // Verificar que la fecha está presente
    if (!fecha) {
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        // Buscar especies que coincidan con la fecha proporcionada
        const especies = await EspecieModel.findAll({
            where: {
                Fecha: fecha
            },
        });

        if (especies.length > 0) {
            // Si se encuentran especies, devolverlas con status 200
            res.status(200).json(especies);
            return;
        } 

        // Si no se encuentran especies, devolver un mensaje con status 404
        res.status(404).json({ message: 'No se encontraron especies para la fecha proporcionada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al recuperar especies por fecha:', error);
        res.status(500).json({ message: 'Error al recuperar especies por fecha', error: error.message });
    }
};

// Crear una especie
export const createEspecie = async (req, res) => {
    const { Nom_Especie, Car_Especie, Tam_Promedio, Den_Especie } = req.body;
    const Img_Especie = req.file ? req.file.filename : null;

    // Verificar que todos los campos obligatorios están presentes
    if (!Nom_Especie || !Car_Especie || !Tam_Promedio || !Den_Especie) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Crear una nueva especie con los datos proporcionados
        const nuevaEspecie = await EspecieModel.create({
            Nom_Especie,
            Car_Especie,
            Img_Especie,
            Tam_Promedio,
            Den_Especie
        });

        if (nuevaEspecie) {
            // Si la especie se crea exitosamente, devolverla con status 201
            res.status(201).json({ message: "¡Especie creada exitosamente!", data: nuevaEspecie });
            return;
        } 

    } catch (error) {
        // Manejar errores en caso de fallo en la creación
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return;
        }

        console.error('Error al crear especie:', error);
        res.status(500).json({ message: 'Error al crear especie', error: error.message });
    }
};

// Actualizar una especie
export const updateEspecie = async (req, res) => {
    const { Id_Especie } = req.params;
    const { Nom_Especie, Car_Especie, Tam_Promedio, Den_Especie } = req.body;
    const Img_Especie = req.file ? req.file.filename : null;

    // Verificar que el ID de especie está presente
    if (!Id_Especie) {
        res.status(400).json({ message: 'Id_Especie es requerido' });
        return;
    }

    try {
        // Buscar la especie por su ID
        const especie = await EspecieModel.findByPk(Id_Especie);

        if (!especie) {
            // Si la especie no se encuentra, devolver un mensaje con status 404
            res.status(404).json({ message: 'Especie no encontrada' });
            return;
        }

        // Actualizar la especie con los datos proporcionados
        await especie.update({
            Nom_Especie: Nom_Especie || especie.Nom_Especie,
            Car_Especie: Car_Especie || especie.Car_Especie,
            Tam_Promedio: Tam_Promedio || especie.Tam_Promedio,
            Den_Especie: Den_Especie || especie.Den_Especie,
            Img_Especie: Img_Especie || especie.Img_Especie
        });

        // Devolver la especie actualizada con status 200
        res.status(200).json({ message: '¡Especie actualizada exitosamente!', data: especie });
        return;
    } catch (error) {
        // Manejar errores en caso de fallo en la actualización
        console.error('Error al actualizar especie:', error);
        res.status(500).json({ message: 'Error al actualizar especie', error: error.message });
    }
};

// Borrar una especie
export const deleteEspecie = async (req, res) => {
    const { Id_Especie } = req.params;

    // Verificar que el ID de especie está presente
    if (!Id_Especie) {
        res.status(400).json({ message: 'Id_Especie es requerido' });
        return;
    }

    try {
        // Eliminar la especie por su ID
        const result = await EspecieModel.destroy({
            where: { Id_Especie }
        });

        if (result) {
            // Si la especie se elimina exitosamente, devolver un mensaje con status 200
            res.status(200).json({ message: 'Especie eliminada exitosamente' });
            return;
        }

        // Si no se eliminó ninguna especie, devolver un mensaje con status 404
        res.status(404).json({ message: 'Especie no encontrada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la eliminación
        console.error('Error al eliminar especie:', error);
        res.status(500).json({ message: 'Error al eliminar especie', error: error.message });
    }
};
