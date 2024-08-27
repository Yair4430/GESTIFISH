import { Sequelize, Op } from "sequelize"; // Importa Sequelize y operadores de Sequelize
import TrasladoModel from '../models/trasladosModel.js'; // Importa el modelo de Traslados
import { ResponsableModel } from '../app.js'; // Importa el modelo de Responsable

// Obtener todos los traslados OK
export const getAllTraslados = async (req, res) => {
    try {
        // Busca todos los registros de traslados incluyendo el modelo de Responsable asociado
        const traslados = await TrasladoModel.findAll({
            include: [{
                model: ResponsableModel,
                as: 'responsable',
            }]
        });

        // Si hay registros, responde con un status 200 y los registros en formato JSON
        if (traslados.length > 0) {
            res.status(200).json(traslados);
            return;
        }

        // Si no hay registros, responde con un mensaje indicando que no hay traslados
        res.status(400).json({ message: 'No hay traslados' });
        return

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención de los traslados
        console.error('Error al obtener todos los traslados:', error);
        res.status(500).json({ message: 'Error al obtener traslados' });
        return
    }
};

// Obtener un traslado por ID OK
export const getTraslado = async (req, res) => {
    const { Id_Traslado } = req.params; // Obtiene el ID del traslado desde los parámetros de la solicitud

    // Verifica que se haya proporcionado un ID
    if (!Id_Traslado) {
        res.status(400).json({ message: 'Id_Traslado es requerido' });
        return;
    }

    try {
        // Busca el traslado por su ID, incluyendo el modelo de Responsable asociado
        const traslado = await TrasladoModel.findByPk(Id_Traslado, {
            include: [{
                model: ResponsableModel,
                as: 'responsable'
            }]
        });

        // Si se encuentra el traslado, responde con un status 200 y el traslado en formato JSON
        if (traslado) {
            res.status(200).json(traslado);
            return;
        } 

        // Si no se encuentra el traslado, responde con un mensaje indicando que no se encontró
        res.status(404).json({ message: "Traslado no encontrado." });
        return

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención del traslado
        console.error('Error al recuperar el traslado:', error);
        res.status(500).json({ message: "Error al recuperar el traslado." });
        return
    }
};

// Obtener traslados por fecha OK
export const getTrasladosByFecha = async (req, res) => {
    const { fecha } = req.params; // Obtiene la fecha desde los parámetros de la solicitud

    // Verifica que se haya proporcionado una fecha
    if (!fecha) {
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        // Busca todos los traslados que coincidan con la fecha proporcionada
        const traslados = await TrasladoModel.findAll({
            where: {
                Fec_Traslado: fecha
            },
            include: [{
                model: ResponsableModel,
                as: 'responsable'
            }]
        });

        // Si se encuentran traslados, responde con un status 200 y los registros en formato JSON
        if (traslados.length > 0) {
            res.status(200).json(traslados);
            return;
        } 

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención de los traslados por fecha
        console.error('Error al recuperar traslados por fecha:', error);
        res.status(500).json({ message: "Error al recuperar traslados por fecha." });
        return
    }
};

// Crear un traslado OK
export const createTraslado = async (req, res) => {
    const { Fec_Traslado, Can_Peces, Id_Responsable, Obs_Traslado, Hor_Traslado } = req.body;

    if (!Fec_Traslado || !Can_Peces || !Id_Responsable || !Obs_Traslado || !Hor_Traslado) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        const nuevoTraslado = await TrasladoModel.create(req.body);

        if (nuevoTraslado) {
            res.status(201).json({ message: "¡Traslado creado exitosamente!", data: nuevoTraslado });
            return;
        }

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
             res.status(400).json({ message: 'Error de validación', errors: error.errors });
             return
        }

        res.status(500).json({ message: 'Error al crear traslado', error: error.message });
        return
    }
};


// Actualizar un traslado OK 
export const updateTraslado = async (req, res) => {
    const { Id_Traslado } = req.params;
    const { Fec_Traslado, Can_Peces, Id_Responsable, Obs_Traslado, Hor_Traslado } = req.body;

    if (!Id_Traslado) {
         res.status(400).json({ message: 'Id_Traslado es requerido' });
         return
    }

    if (!Fec_Traslado || !Can_Peces || !Id_Responsable || !Obs_Traslado || !Hor_Traslado) {
         res.status(400).json({ message: 'Todos los campos son obligatorios' });
         return
    }

    try {
        const traslado = await TrasladoModel.findByPk(Id_Traslado);

        if (!traslado) {
             res.status(404).json({ message: 'Traslado no encontrado' });
             return
        }

        await traslado.update(req.body);

        res.status(200).json({ message: 'Traslado actualizado con éxito', traslado });
        return

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar traslado', error: error.message });
        return
    }
};

// Borrar un traslado OK 
export const deleteTraslado = async (req, res) => {
    const { Id_Traslado } = req.params; // Obtiene el ID del traslado desde los parámetros de la solicitud

    // Verifica que se haya proporcionado un ID
    if (!Id_Traslado) {
        res.status(400).json({ message: 'Id_Traslado es requerido' });
        return;
    }

    try {
        // Busca el traslado por su ID
        const traslado = await TrasladoModel.findByPk(Id_Traslado);
        if (traslado) {
            // Si se encuentra el traslado, lo elimina
            await traslado.destroy();

            // Verifica que el traslado fue eliminado con éxito
            const trasladoEliminado = await TrasladoModel.findByPk(Id_Traslado);
            if (!trasladoEliminado) {
                // Responde con un status 200 y un mensaje de éxito si la eliminación fue exitosa
                res.status(200).json({ message: 'Traslado eliminado con éxito' });
                return;
            } 

        } 

    } catch (error) {
        // Manejo de errores en caso de fallo en la eliminación del traslado
        console.error('Error al eliminar traslado:', error);
        res.status(500).json({ message: 'Error al eliminar traslado', error: error.message });
        return;
    }
};

