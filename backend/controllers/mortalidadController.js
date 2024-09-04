import { Sequelize, Op } from 'sequelize'; // Importa Sequelize y operadores de Sequelize
import MortalidadModel from '../models/mortalidadModel.js'; // Importa el modelo de Mortalidad
import ResponsableModel from '../models/responsableModel.js'; // Importa el modelo de Responsable
import SiembraModel from '../models/siembraModel.js'; // Importa el modelo de Siembra

// Obtener todos los registros de mortalidad
export const getAllMortalidad = async (req, res) => {
    try {
        // Busca todos los registros de mortalidad incluyendo los modelos de Responsable y Siembra asociados
        const mortalidad = await MortalidadModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        // Si hay registros, responde con un status 200 y los registros en formato JSON
        if (mortalidad.length > 0) {
            res.status(200).json(mortalidad);
            return;
        }

        // Si no hay registros, responde con un mensaje indicando que no hay registros de mortalidad
        res.status(400).json({ message: 'No hay registros de mortalidad' });

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención de los registros de mortalidad
        console.error('Error al obtener todos los registros de mortalidad:', error);
        res.status(500).json({ message: 'Error al obtener los registros de mortalidad' });
    }
};

// Obtener un registro de mortalidad por ID
export const getMortalidadById = async (req, res) => {
    const { Id_Mortalidad } = req.params; // Obtiene el ID de mortalidad desde los parámetros de la solicitud

    // Verifica que se haya proporcionado un ID
    if (!Id_Mortalidad) {
        res.status(400).json({ message: 'Id_Mortalidad es requerido' });
        return;
    }

    try {
        // Busca el registro de mortalidad por su ID, incluyendo los modelos de Responsable y Siembra asociados
        const mortalidad = await MortalidadModel.findByPk(Id_Mortalidad, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        // Si se encuentra el registro de mortalidad, responde con un status 200 y el registro en formato JSON
        if (mortalidad) {
            res.status(200).json(mortalidad);
            return;
        } 

        // Si no se encuentra el registro de mortalidad, responde con un mensaje indicando que no se encontró
        res.status(404).json({ message: "Registro de mortalidad no encontrado." });

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención del registro de mortalidad
        console.error("Error al recuperar registro de mortalidad:", error.message);
        res.status(500).json({ message: "Error al recuperar el registro de mortalidad." });
    }
};

// Obtener registros de mortalidad por fecha
export const getMortalidadByFecha = async (req, res) => {
    const { Fec_Mortalidad } = req.params; // Obtiene la fecha desde los parámetros de la solicitud

    // Verifica que se haya proporcionado una fecha
    if (!Fec_Mortalidad) {
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        // Busca todos los registros de mortalidad que coincidan con la fecha proporcionada
        const mortalidad = await MortalidadModel.findAll({
            where: {
                Fec_Mortalidad: Fec_Mortalidad
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        // Si se encuentran registros de mortalidad, responde con un status 200 y los registros en formato JSON
        if (mortalidad.length > 0) {
            res.status(200).json(mortalidad);
            return;
        } else {
            // Si no se encuentran registros de mortalidad, responde con un mensaje indicando que no se encontraron
            res.status(404).json({ message: "No se encontraron registros de mortalidad." });
        }

    } catch (error) {
        // Manejo de errores en caso de fallo en la obtención de los registros de mortalidad por fecha
        console.error("Error al recuperar registros de mortalidad por fecha:", error.message);
        res.status(500).json({ message: "Error al recuperar registros de mortalidad por fecha." });
    }
};

// Crear un registro de mortalidad
export const createMortalidad = async (req, res) => {
    const { Fec_Mortalidad, Can_Peces, Mot_Mortalidad, Id_Responsable, Id_Siembra } = req.body; // Obtiene los datos del cuerpo de la solicitud

    // Verifica que todos los campos obligatorios estén presentes
    if (!Fec_Mortalidad || !Can_Peces || !Mot_Mortalidad || !Id_Responsable || !Id_Siembra) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Intenta crear un nuevo registro de mortalidad con los datos proporcionados
        const nuevaMortalidad = await MortalidadModel.create({
            Fec_Mortalidad,
            Can_Peces,
            Mot_Mortalidad,
            Id_Responsable,
            Id_Siembra
        });

        // Si el registro fue creado con éxito, responde con un status 201 y el nuevo registro en formato JSON
        if (nuevaMortalidad) {
            res.status(201).json(nuevaMortalidad);
            return;
        }

    } catch (error) {
        // Manejo de errores en caso de fallo en la creación del registro de mortalidad
        console.error('Error al crear registro de mortalidad:', error);
        return res.status(500).json({ message: 'Error al crear registro de mortalidad', error: error.message });
    }
};

// Actualizar un registro de mortalidad
export const updateMortalidad = async (req, res) => {
    const { Id_Mortalidad } = req.params; // Obtiene el ID de mortalidad desde los parámetros de la solicitud
    const { Fec_Mortalidad, Can_Peces, Mot_Mortalidad, Id_Responsable, Id_Siembra } = req.body; // Obtiene los datos del cuerpo de la solicitud

    // Verifica que se haya proporcionado un ID y todos los campos obligatorios
    if (!Id_Mortalidad) {
        res.status(400).json({ message: 'Id_Mortalidad es requerido' });
        return;
    }

    if (!Fec_Mortalidad || !Can_Peces || !Mot_Mortalidad || !Id_Responsable || !Id_Siembra) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Busca el registro de mortalidad por su ID
        const mortalidad = await MortalidadModel.findByPk(Id_Mortalidad);
        if (mortalidad) {
            // Si el registro de mortalidad se encuentra, actualiza los campos con los nuevos valores
            await mortalidad.update({
                Fec_Mortalidad,
                Can_Peces,
                Mot_Mortalidad,
                Id_Responsable,
                Id_Siembra
            });

            // Verifica que la actualización fue exitosa volviendo a obtener el registro actualizado
            const mortalidadActualizada = await MortalidadModel.findByPk(Id_Mortalidad);

            if (mortalidadActualizada) {
                // Responde con un status 200 y el registro actualizado en formato JSON
                res.status(200).json({ message: 'Registro de mortalidad actualizado con éxito', mortalidad: mortalidadActualizada });
                return;
            } else {
                // Si la verificación falla, responde con un mensaje de error
                res.status(500).json({ message: 'Error al verificar la actualización del registro de mortalidad.' });
                return;
            }
        } else {
            // Si no se encuentra el registro de mortalidad, responde con un mensaje indicando que no se encontró
            res.status(404).json({ message: 'Registro de mortalidad no encontrado' });
            return;
        }
    } catch (error) {
        // Manejo de errores en caso de fallo en la actualización del registro de mortalidad
        console.error('Error al actualizar registro de mortalidad:', error);
        res.status(500).json({ message: 'Error al actualizar registro de mortalidad' });
    }
};

// Eliminar un registro de mortalidad
export const deleteMortalidad = async (req, res) => {
    const { Id_Mortalidad } = req.params; // Obtiene el ID de mortalidad desde los parámetros de la solicitud

    // Verifica que se haya proporcionado un ID
    if (!Id_Mortalidad) {
        res.status(400).json({ message: 'Id_Mortalidad es requerido' });
        return;
    }

    try {
        // Busca el registro de mortalidad por su ID
        const mortalidad = await MortalidadModel.findByPk(Id_Mortalidad);
        if (mortalidad) {
            // Si el registro de mortalidad se encuentra, lo elimina
            await mortalidad.destroy();
            res.status(200).json({ message: 'Registro de mortalidad eliminado con éxito' });
            return;
        } else {
            // Si no se encuentra el registro de mortalidad, responde con un mensaje indicando que no se encontró
            res.status(404).json({ message: 'Registro de mortalidad no encontrado' });
            return;
        }
    } catch (error) {
        // Manejo de errores en caso de fallo en la eliminación del registro de mortalidad
        console.error('Error al eliminar registro de mortalidad:', error);
        res.status(500).json({ message: 'Error al eliminar registro de mortalidad' });
    }
};