import { Sequelize } from "sequelize";
import ActividadModel from "../models/actividadModel.js";
import { ResponsableModel, EstanqueModel } from "../app.js";

// Obtener todas las actividades OK
export const getAllActividad = async (req, res) => {
    try {
        // Buscar todas las actividades, incluyendo responsables y estanques relacionados
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

        if (actividades.length > 0) {
            // Si hay actividades, devolverlas con status 200
            res.status(200).json(actividades);
            return;
        }

        // Si no hay actividades, devolver un mensaje con status 400
        res.status(400).json({ message: 'No hay actividades' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        res.status(500).json({ message: 'Error al obtener actividades', error: error.message });
    }
};

// Obtener una actividad por ID OK
export const getActividad = async (req, res) => {
    const { Id_Actividad } = req.params;

    // Verificar que el ID de la actividad está presente
    if (!Id_Actividad) {
        res.status(400).json({ message: 'Id_Actividad es requerido' });
        return;
    }

    try {
        // Buscar la actividad por su ID, incluyendo responsables y estanques relacionados
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
            // Si se encuentra la actividad, devolverla con status 200
            res.status(200).json(actividad);
            return;
        }

        // Si la actividad no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Actividad no encontrada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        res.status(500).json({ message: 'Error al obtener actividad', error: error.message });
    }
};

// Obtener actividades por fecha OK
export const getQueryActividad = async (req, res) => {
    const { FechaActividad } = req.params;

    // Verificar que la fecha de la actividad está presente
    if (!FechaActividad) {
        res.status(400).json({ message: 'Fec_Actividad es requerido' });
        return;
    }

    try {
        // Buscar actividades por fecha, incluyendo responsables y estanques relacionados
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
                }
            ]
        });

        if (actividades.length > 0) {
            // Si se encuentran actividades, devolverlas con status 200
            res.status(200).json(actividades);
            return;
        }

        // Si no se encuentran actividades, devolver un mensaje con status 404
        res.status(404).json({ message: 'No se encontraron actividades' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        res.status(500).json({ message: 'Error al consultar actividad', error: error.message });
    }
};

// Crear una actividad OK
export const createActividad = async (req, res) => {
    const { Nom_Actividad, Des_Actividad, Id_Responsable, Fec_Actividad, Hor_Actividad, Fas_Produccion, Id_Estanque } = req.body;

    // Verificar que todos los campos obligatorios están presentes
    if (!Nom_Actividad || !Des_Actividad || !Id_Responsable || !Fec_Actividad || !Hor_Actividad || !Fas_Produccion || !Id_Estanque) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Crear una nueva actividad con los datos proporcionados
        const nuevaActividad = await ActividadModel.create(req.body);

        if(nuevaActividad){
            // Si la actividad se crea exitosamente, devolverla con status 201
            res.status(201).json({ message: "¡Registro creado exitosamente!", data: nuevaActividad });
            return;
        }

    } catch (error) {
        // Manejar errores en caso de fallo en la creación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }

        res.status(500).json({ message: 'Error al crear actividad', error: error.message });
    }
};

// Actualizar una actividad OK
export const updateActividad = async (req, res) => {
    const { Id_Actividad } = req.params;
    const { Nom_Actividad, Des_Actividad, Id_Responsable, Fec_Actividad, Hor_Actividad, Fas_Produccion, Id_Estanque } = req.body;

    // Verificar que el ID de la actividad está presente
    if (!Id_Actividad) {
        return res.status(400).json({ message: 'Id_Actividad es requerido' });
    }

    // Verificar que todos los campos obligatorios están presentes
    if (!Nom_Actividad || !Des_Actividad || !Id_Responsable || !Fec_Actividad || !Hor_Actividad || !Fas_Produccion || !Id_Estanque) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Buscar la actividad por su ID
        const actividad = await ActividadModel.findByPk(Id_Actividad);

        if (!actividad) {
            // Si la actividad no se encuentra, devolver un mensaje con status 404
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Actualizar la actividad con los datos proporcionados
        await actividad.update(req.body);

        // Devolver la actividad actualizada con status 200
        res.status(200).json({ message: 'Actividad actualizada con éxito', actividad });
    } catch (error) {
        // Manejar errores en caso de fallo en la actualización
        res.status(500).json({ message: 'Error al actualizar actividad', error: error.message });
    }
};

// Borrar una actividad OK 
export const deleteActividad = async (req, res) => {
    const { Id_Actividad } = req.params; // Obtiene el ID de la actividad desde los parámetros de la solicitud

    // Verificar que se haya proporcionado un ID
    if (!Id_Actividad) {
        res.status(400).json({ message: 'Id_Actividad es requerido' });
        return;
    }

    try {
        // Buscar la actividad por su ID
        const actividad = await ActividadModel.findByPk(Id_Actividad);
        if (actividad) {
            // Si se encuentra la actividad, eliminarla
            await actividad.destroy();

            // Verificar que la actividad fue eliminada con éxito
            const actividadEliminada = await ActividadModel.findByPk(Id_Actividad);
            if (!actividadEliminada) {
                // Devolver un mensaje de éxito si la eliminación fue exitosa
                res.status(200).json({ message: 'Actividad eliminada con éxito' });
                return;
            }
        }
    } catch (error) {
        // Manejar errores en caso de fallo en la eliminación de la actividad
        console.error('Error al eliminar actividad:', error);
        res.status(500).json({ message: 'Error al eliminar actividad', error: error.message });
        return;
    }
};
