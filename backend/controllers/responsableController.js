import { Sequelize, Op } from "sequelize"; // Importa Sequelize y operadores de Sequelize
import ResponsableModel from "../models/responsableModel.js"; // Importa el modelo de Responsable

// Obtener todos los responsables
export const getAllResponsable = async (req, res) => {
    try {
        // Busca todos los registros de responsables
        const responsables = await ResponsableModel.findAll();

        // Si hay registros, responde con un status 200 y los registros en formato JSON
        if (responsables.length > 0) {
            res.status(200).json(responsables);
            return;
        }

        // Si no hay registros, responde con un mensaje indicando que no hay responsables
        res.status(400).json({ message: 'No hay responsables' });
        return;

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención de los responsables
        console.error('Error al obtener todos los responsables:', error);
        res.status(500).json({ message: 'Error al obtener responsables' });
        return;
    }
};

// Obtener un responsable por ID
export const getResponsable = async (req, res) => {
    const { Id_Responsable } = req.params; // Obtiene el ID del responsable desde los parámetros de la solicitud

    // Verifica que se haya proporcionado un ID
    if (!Id_Responsable) {
        res.status(400).json({ message: 'Id_Responsable es requerido' });
        return;
    }

    try {
        // Busca el responsable por su ID
        const responsable = await ResponsableModel.findByPk(Id_Responsable);

        // Si se encuentra el responsable, responde con un status 200 y el responsable en formato JSON
        if (responsable) {
            res.status(200).json(responsable);
            return;
        } 

        // Si no se encuentra el responsable, responde con un mensaje indicando que no se encontró
        res.status(404).json({ message: 'Responsable no encontrado' });
        return;

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención del responsable
        console.error('Error al obtener responsable:', error);
        res.status(500).json({ message: 'Error al obtener responsable' });
        return;
    }
};

// Consultar responsables por documento
export const getQueryResponsable = async (req, res) => {
    const { Doc_Responsable } = req.params;

    // Verifica que se haya proporcionado un documento
    if (!Doc_Responsable) {
        res.status(400).json({ message: 'Doc_Responsable es requerido' });
        return;
    }

    try {
        // Busca todos los responsables que coincidan con el documento proporcionado
        const responsables = await ResponsableModel.findAll({
            where: { Doc_Responsable: { [Op.like]: `%${Doc_Responsable}%` } }
        });

        // Si se encuentran responsables, responde con un status 200 y los registros en formato JSON
        if (responsables.length > 0) {
            res.status(200).json(responsables);
            return;
        } 

        // Si no se encuentran responsables, responde con un mensaje indicando que no se encontraron
        res.status(404).json({ message: 'No se encontraron responsables' });
        return;

    } catch (error) {
        // Manejo de errores en caso de fallo en la consulta de responsables
        console.error('Error al consultar responsables por documento:', error);
        res.status(500).json({ message: 'Error al consultar responsables por documento' });
        return;
    }
};

// Crear un responsable
export const createResponsable = async (req, res) => {
    const { Nom_Responsable, Ape_Responsable, Doc_Responsable, Tip_Responsable, Cor_Responsable, Num_Responsable } = req.body;

    // Verifica que se hayan proporcionado todos los campos obligatorios
    if (!Nom_Responsable || !Ape_Responsable || !Doc_Responsable || !Tip_Responsable) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Crea un nuevo responsable
        const nuevoResponsable = await ResponsableModel.create(req.body);

        // Si se crea el responsable, responde con un status 201 y el nuevo responsable en formato JSON
        if (nuevoResponsable) {
            res.status(201).json({ message: "¡Responsable creado exitosamente!", data: nuevoResponsable });
            return;
        }

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return;
        }

        // Manejo de errores en caso de fallo en la creación del responsable
        res.status(500).json({ message: 'Error al crear responsable', error: error.message });
        return;
    }
};

// Actualizar un responsable
export const updateResponsable = async (req, res) => {
    const { Id_Responsable } = req.params;
    const { Nom_Responsable, Ape_Responsable, Doc_Responsable, Tip_Responsable, Cor_Responsable, Num_Responsable } = req.body;

    // Verifica que se haya proporcionado un ID
    if (!Id_Responsable) {
        res.status(400).json({ message: 'Id_Responsable es requerido' });
        return;
    }

    // Verifica que se hayan proporcionado todos los campos obligatorios
    if (!Nom_Responsable || !Ape_Responsable || !Doc_Responsable || !Tip_Responsable || !Cor_Responsable || !Num_Responsable) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Busca el responsable por su ID
        const responsable = await ResponsableModel.findByPk(Id_Responsable);

        // Verifica si el responsable fue encontrado
        if (!responsable) {
            res.status(404).json({ message: 'Responsable no encontrado' });
            return;
        }

        // Actualiza el responsable con los nuevos datos
        await responsable.update(req.body);

        // Responde con un status 200 y el responsable actualizado en formato JSON
        res.status(200).json({ message: 'Responsable actualizado con éxito', data: responsable });
        return;

    } catch (error) {
        // Manejo de errores en caso de fallo en la actualización del responsable
        res.status(500).json({ message: 'Error al actualizar responsable', error: error.message });
        return;
    }
};

// Borrar un responsable
export const deleteResponsable = async (req, res) => {
    const { Id_Responsable } = req.params; // Obtiene el ID del responsable desde los parámetros de la solicitud

    // Verifica que se haya proporcionado un ID
    if (!Id_Responsable) {
        res.status(400).json({ message: 'Id_Responsable es requerido' });
        return;
    }

    try {
        // Busca el responsable por su ID
        const responsable = await ResponsableModel.findByPk(Id_Responsable);
        if (responsable) {
            // Si se encuentra el responsable, lo elimina
            await responsable.destroy();

            // Verifica que el responsable fue eliminado con éxito
            const responsableEliminado = await ResponsableModel.findByPk(Id_Responsable);
            if (!responsableEliminado) {
                // Responde con un status 200 y un mensaje de éxito si la eliminación fue exitosa
                res.status(200).json({ message: 'Responsable eliminado con éxito' });
                return;
            }

        }

    } catch (error) {
        // Manejo de errores en caso de fallo en la eliminación del responsable
        console.error('Error al eliminar responsable:', error);
        res.status(500).json({ message: 'Error al eliminar responsable', error: error.message });
        return;
    }
};
