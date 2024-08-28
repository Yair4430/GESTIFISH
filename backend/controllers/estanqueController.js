import { Sequelize, Op } from "sequelize";
import EstanqueModel from "../models/estanqueModel.js";
import { ResponsableModel } from '../app.js'; // Importa el modelo de Responsable si es necesario para las asociaciones

// Obtener todos los estanques
export const getAllEstanque = async (req, res) => {
    try {
        // Buscar todos los estanques en la base de datos
        const estanques = await EstanqueModel.findAll({});

        if (estanques.length > 0) {
            // Si se encuentran estanques, devolverlos con status 200
            res.status(200).json(estanques);
            return;
        }

        // Si no se encuentran estanques, devolver un mensaje con status 404
        res.status(404).json({ message: 'No se encontraron estanques' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al obtener todos los estanques:', error);
        res.status(500).json({ message: 'Error al obtener estanques' });
    }
};

// Obtener un estanque por ID
export const getEstanque = async (req, res) => {
    const { Id_Estanque } = req.params;

    // Verificar que el ID de estanque está presente
    if (!Id_Estanque) {
        res.status(400).json({ message: 'Id_Estanque es requerido' });
        return;
    }

    try {
        // Buscar el estanque por su ID
        const estanque = await EstanqueModel.findByPk(Id_Estanque);

        if (estanque) {
            // Si se encuentra el estanque, devolverlo con status 200
            res.status(200).json(estanque);
            return;
        }

        // Si el estanque no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Estanque no encontrado' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al obtener estanque:', error);
        res.status(500).json({ message: 'Error al obtener estanque', error: error.message });
    }
};

// Consultar estanque por ID usando like
export const getQueryEstanque = async (req, res) => {
    const { Id_Estanque } = req.params;

    // Verificar que el ID de estanque está presente
    if (!Id_Estanque) {
        return res.status(400).json({ message: "Id_Estanque es requerido" });
    }

    try {
        // Buscar estanques cuyo ID coincida parcialmente con el proporcionado
        const estanque = await EstanqueModel.findAll({
            where: {
                Id_Estanque: {
                    [Op.like]: `%${Id_Estanque}%`
                }
            }
        });

        // Devolver los estanques encontrados con status 200
        return res.json(estanque);
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error("Error al consultar estanque por ID:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener estanques por fecha
export const getEstanquesByFecha = async (req, res) => {
    const { fecha } = req.params;

    // Verificar que la fecha está presente
    if (!fecha) {
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        // Buscar estanques que coincidan con la fecha proporcionada
        const estanques = await EstanqueModel.findAll({
            where: {
                Fecha: fecha
            }
        });

        if (estanques.length > 0) {
            // Si se encuentran estanques, devolverlos con status 200
            res.status(200).json(estanques);
            return;
        }

        // Si no se encuentran estanques, devolver un mensaje con status 404
        res.status(404).json({ message: 'No se encontraron estanques para la fecha proporcionada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al recuperar estanques por fecha:', error);
        res.status(500).json({ message: 'Error al recuperar estanques por fecha' });
    }
};

// Crear un estanque
export const createEstanque = async (req, res) => {
    const { Id_Estanque, Nom_Estanque, Esp_Agua, Tip_Estanque, Lar_Estanque, Anc_Estanque, Des_Estanque, Rec_Agua } = req.body;
    const Img_Estanque = req.file ? req.file.filename : null;

    // Verificar que todos los campos obligatorios están presentes
    if (!Nom_Estanque || !Esp_Agua || !Tip_Estanque || !Lar_Estanque || !Anc_Estanque || !Des_Estanque) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Crear un nuevo estanque con los datos proporcionados
        const nuevoEstanque = await EstanqueModel.create({
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

        if (nuevoEstanque) {
            // Si el estanque se crea exitosamente, devolverlo con status 201
            res.status(201).json({ message: "¡Estanque creado exitosamente!", data: nuevoEstanque });
            return;
        }
    } catch (error) {
        // Manejar errores en caso de fallo en la creación
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return;
        }

        console.error('Error al crear estanque:', error);
        res.status(500).json({ message: 'Error al crear estanque', error: error.message });
    }
};

// Actualizar un estanque
export const updateEstanque = async (req, res) => {
    const { Id_Estanque } = req.params;
    const { Nom_Estanque, Esp_Agua, Tip_Estanque, Lar_Estanque, Anc_Estanque, Des_Estanque, Rec_Agua } = req.body;
    const Img_Estanque = req.file ? req.file.filename : null;

    // Verificar que el ID de estanque está presente
    if (!Id_Estanque) {
        res.status(400).json({ message: 'Id_Estanque es requerido' });
        return;
    }

    // Verificar que todos los campos obligatorios están presentes
    if (!Nom_Estanque || !Esp_Agua || !Tip_Estanque || !Lar_Estanque || !Anc_Estanque || !Des_Estanque || !Rec_Agua) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Buscar el estanque por su ID
        const estanque = await EstanqueModel.findByPk(Id_Estanque);

        if (!estanque) {
            // Si el estanque no se encuentra, devolver un mensaje con status 404
            res.status(404).json({ message: 'Estanque no encontrado' });
            return;
        }

        // Actualizar el estanque con los datos proporcionados
        await estanque.update({
            Nom_Estanque,
            Esp_Agua,
            Tip_Estanque,
            Lar_Estanque,
            Anc_Estanque,
            Des_Estanque,
            Img_Estanque: Img_Estanque || estanque.Img_Estanque,
            Rec_Agua
        });

        // Devolver el estanque actualizado con status 200
        res.status(200).json({ message: '¡Estanque actualizado exitosamente!', data: estanque });
    } catch (error) {
        // Manejar errores en caso de fallo en la actualización
        console.error('Error al actualizar estanque:', error);
        res.status(500).json({ message: 'Error al actualizar estanque', error: error.message });
    }
};

// Borrar un estanque
export const deleteEstanque = async (req, res) => {
    const { Id_Estanque } = req.params;

    // Verificar que el ID de estanque está presente
    if (!Id_Estanque) {
        res.status(400).json({ message: 'Id_Estanque es requerido' });
        return;
    }

    try {
        // Eliminar el estanque por su ID
        const result = await EstanqueModel.destroy({
            where: { Id_Estanque }
        });

        if (result) {
            // Si el estanque se elimina exitosamente, devolver un mensaje con status 200
            res.status(200).json({ message: 'Estanque eliminado exitosamente' });
            return;
        }

        // Si no se eliminó ningún estanque, devolver un mensaje con status 404
        res.status(404).json({ message: 'Estanque no encontrado' });
    } catch (error) {
        // Manejar errores en caso de fallo en la eliminación
        console.error('Error al eliminar estanque:', error);
        res.status(500).json({ message: 'Error al eliminar estanque', error: error.message });
    }
};