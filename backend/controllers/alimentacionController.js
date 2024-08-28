import AlimentacionModel from '../models/alimentacionModel.js';
import ResponsableModel from '../models/responsableModel.js';
import SiembraModel from '../models/siembraModel.js';

// Obtener todos los registros de alimentación OK
export const getAllAlimentacion = async (req, res) => {
    try {
        // Buscar todos los registros de alimentación, incluyendo responsables y siembras relacionados
        const alimentacion = await AlimentacionModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (alimentacion.length > 0) {
            // Si se encuentran registros, devolverlos con status 200
            res.status(200).json(alimentacion);
            return;
        }

        // Si no hay registros, devolver un mensaje con status 400
        res.status(400).json({ message: 'No hay registros de alimentación' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        res.status(500).json({ message: 'Error al obtener los registros de alimentación' });
    }
};

// Obtener un registro de alimentación por ID OK
export const getAlimentacionById = async (req, res) => {
    const { Id_Alimentacion } = req.params;

    // Verificar que el ID de alimentación está presente
    if (!Id_Alimentacion) {
        res.status(400).json({ message: 'Id_Alimentacion es requerido' });
        return;
    }

    try {
        // Buscar el registro de alimentación por su ID, incluyendo responsables y siembras relacionados
        const alimentacion = await AlimentacionModel.findByPk(Id_Alimentacion, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (alimentacion) {
            // Si se encuentra el registro, devolverlo con status 200
            res.status(200).json(alimentacion);
            return;
        }

        // Si el registro no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Registro de alimentación no encontrado' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        res.status(500).json({ message: "Error al recuperar el registro de alimentación." });
    }
};

// Obtener registros de alimentación por fecha OK
export const getAlimentacionByFecha = async (req, res) => {
    const { Fec_Alimentacion } = req.params; // Obtiene la fecha desde los parámetros de la solicitud

    // Verificar que la fecha está presente
    if (!Fec_Alimentacion) {
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        // Buscar todos los registros de alimentación que coincidan con la fecha proporcionada
        const alimentacion = await AlimentacionModel.findAll({
            where: {
                Fec_Alimentacion: Fec_Alimentacion
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (alimentacion.length > 0) {
            // Si se encuentran registros, devolverlos con status 200
            res.status(200).json(alimentacion);
            return;
        }

        // Si no se encuentran registros, devolver un mensaje con status 404
        res.status(404).json({ message: 'No se encontraron registros de alimentación para la fecha proporcionada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al recuperar registros de alimentación por fecha:', error);
        res.status(500).json({ message: 'Error al recuperar registros de alimentación por fecha.' });
    }
};

// Crear un registro de alimentación OK
export const createAlimentacion = async (req, res) => {
    const { Fec_Alimentacion, Can_RacionKg, Id_Siembra, Id_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion } = req.body;

    // Verificar que todos los campos obligatorios están presentes
    if (!Fec_Alimentacion || !Can_RacionKg || !Id_Siembra || !Id_Responsable || !Tip_Alimento || !Hor_Alimentacion || !Vlr_Alimentacion) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Crear un nuevo registro de alimentación con los datos proporcionados
        const nuevaAlimentacion = await AlimentacionModel.create(req.body);

        if(nuevaAlimentacion) {
            // Si el registro se crea exitosamente, devolverlo con status 201
            res.status(201).json({ message: '¡Registro de alimentación creado exitosamente!', data: nuevaAlimentacion });
            return;
        }

    } catch (error) {
        // Manejar errores en caso de fallo en la creación
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return;
        }

        res.status(500).json({ message: 'Error al crear registro de alimentación', error: error.message });
        return;
    }
};

// Actualizar un registro de alimentación OK
export const updateAlimentacion = async (req, res) => {
    const { Id_Alimentacion } = req.params;
    const { Fec_Alimentacion, Can_RacionKg, Id_Siembra, Id_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion } = req.body;

    // Verificar que el ID de alimentación está presente
    if (!Id_Alimentacion) {
        res.status(400).json({ message: 'Id_Alimentacion es requerido' });
        return;
    }

    // Verificar que todos los campos obligatorios están presentes
    if (!Fec_Alimentacion || !Can_RacionKg || !Id_Siembra || !Id_Responsable || !Tip_Alimento || !Hor_Alimentacion || !Vlr_Alimentacion) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Buscar el registro de alimentación por su ID
        const alimentacion = await AlimentacionModel.findByPk(Id_Alimentacion);

        if (!alimentacion) {
            // Si el registro no se encuentra, devolver un mensaje con status 404
            res.status(404).json({ message: 'Registro de alimentación no encontrado' });
            return;
        }

        // Actualizar el registro con los datos proporcionados
        await alimentacion.update(req.body);

        // Devolver el registro actualizado con status 200
        res.status(200).json({ message: 'Registro de alimentación actualizado con éxito', alimentacion });
        return;

    } catch (error) {
        // Manejar errores en caso de fallo en la actualización
        res.status(500).json({ message: 'Error al actualizar registro de alimentación', error: error.message });
        return;
    }
};

// Borrar un registro de alimentación OK
export const deleteAlimentacion = async (req, res) => {
    const { Id_Alimentacion } = req.params;

    // Verificar que el ID de alimentación está presente
    if (!Id_Alimentacion) {
        res.status(400).json({ message: 'Id_Alimentacion es requerido' });
        return;
    }

    try {
        // Buscar el registro de alimentación por su ID
        const alimentacion = await AlimentacionModel.findByPk(Id_Alimentacion);

        if (alimentacion) {
            // Si el registro se encuentra, eliminarlo
            await alimentacion.destroy();

            // Verificar que el registro fue eliminado con éxito
            const alimentacionEliminado = await AlimentacionModel.findByPk(Id_Alimentacion);

            if (!alimentacionEliminado) {
                // Devolver un mensaje de éxito si la eliminación fue exitosa
                res.status(200).json({ message: 'Alimentacion eliminado con éxito' });
                return;
            }
        }
    } catch (error) {
        // Manejar errores en caso de fallo en la eliminación
        res.status(500).json({ message: 'Error al eliminar registro de alimentación', error: error.message });
        return;
    }
};
