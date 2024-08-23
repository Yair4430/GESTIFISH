import { Op } from 'sequelize';
import MuestreoModel from '../models/muestreoModel.js';
import ResponsableModel from '../models/responsableModel.js';
import SiembraModel from '../models/siembraModel.js';

// Obtener todos los registros de muestreo
export const getAllMuestreo = async (req, res) => {
    console.log('Intentando obtener todos los registros de muestreo');
    try {
        // Buscar todos los registros de muestreo e incluir los datos relacionados
        const muestreo = await MuestreoModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (muestreo.length > 0) {
            console.log('Todos los registros de muestreo obtenidos exitosamente');
            res.status(200).json(muestreo);
            return;
        }

        // Si no hay registros, devolver un mensaje con status 400
        res.status(400).json({ message: 'No hay registros de muestreo' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al obtener todos los registros de muestreo:', error);
        res.status(500).json({ message: 'Error al obtener los registros de muestreo' });
    }
};

// Obtener un registro de muestreo por ID
export const getMuestreoById = async (req, res) => {
    const { Id_Muestreo } = req.params;

    // Verificar que el ID de muestreo está presente
    if (!Id_Muestreo) {
        console.warn('Id_Muestreo es requerido');
        res.status(400).json({ message: 'Id_Muestreo es requerido' });
        return;
    }

    try {
        // Buscar el registro de muestreo por su ID e incluir los datos relacionados
        const muestreo = await MuestreoModel.findByPk(Id_Muestreo, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (muestreo) {
            res.status(200).json(muestreo);
            return;
        }

        // Si el registro no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Registro de muestreo no encontrado' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al recuperar registro de muestreo:', error.message);
        res.status(500).json({ message: 'Error al recuperar el registro de muestreo.' });
    }
};

// Obtener registros de muestreo por fecha
export const getMuestreoByFecha = async (req, res) => {
    const { Fec_Muestreo } = req.params;

    // Verificar que la fecha de muestreo está presente
    if (!Fec_Muestreo) {
        console.warn('Fecha es requerida');
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        // Buscar los registros de muestreo que coincidan con la fecha e incluir los datos relacionados
        const muestreo = await MuestreoModel.findAll({
            where: {
                Fec_Muestreo: {
                    [Op.eq]: Fec_Muestreo
                }
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (muestreo.length > 0) {
            res.status(200).json(muestreo);
            return;
        }

        // Si no se encuentran registros para la fecha, devolver un mensaje con status 404
        res.status(404).json({ message: 'No hay registros de muestreo para la fecha proporcionada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al recuperar registros de muestreo por fecha:', error.message);
        res.status(500).json({ message: 'Error al recuperar registros de muestreo por fecha.' });
    }
};

// Crear un nuevo registro de muestreo
export const createMuestreo = async (req, res) => {
    const { Fec_Muestreo, Num_Peces, Obs_Muestreo, Pes_Esperado, Id_Siembra, Id_Responsable, Hor_Muestreo, Pes_Promedio } = req.body;

    // Verificar que todos los campos obligatorios están presentes
    if (!Fec_Muestreo || !Num_Peces || !Obs_Muestreo || !Pes_Esperado || !Id_Siembra || !Id_Responsable || !Hor_Muestreo || !Pes_Promedio) {
        console.warn('Todos los campos son obligatorios');
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        console.log('Datos recibidos:', req.body);

        // Crear un nuevo registro de muestreo con los datos proporcionados
        const nuevoMuestreo = await MuestreoModel.create({
            Fec_Muestreo,
            Num_Peces,
            Obs_Muestreo,
            Pes_Esperado: parseFloat(Pes_Esperado), // Convertir a FLOAT si el modelo lo requiere
            Id_Siembra,
            Id_Responsable,
            Hor_Muestreo,
            Pes_Promedio: parseFloat(Pes_Promedio) // Convertir a FLOAT si el modelo lo requiere
        });

        console.log('Registro de muestreo creado exitosamente:', nuevoMuestreo);
        res.status(201).json(nuevoMuestreo);
    } catch (error) {
        // Manejar errores en caso de fallo en la creación
        console.error('Error al crear registro de muestreo:', error);
        res.status(500).json({ message: 'Error al crear registro de muestreo', error: error.message });
    }
};

// Actualizar un registro de muestreo
export const updateMuestreo = async (req, res) => {
    const { Id_Muestreo } = req.params;
    const { Fec_Muestreo, Num_Peces, Obs_Muestreo, Pes_Esperado, Id_Siembra, Id_Responsable, Hor_Muestreo, Pes_Promedio } = req.body;

    // Verificar que el ID de muestreo está presente
    if (!Id_Muestreo) {
        console.warn('Id_Muestreo es requerido');
        res.status(400).json({ message: 'Id_Muestreo es requerido' });
        return;
    }

    // Verificar que todos los campos obligatorios están presentes
    if (!Fec_Muestreo || !Num_Peces || !Obs_Muestreo || !Pes_Esperado || !Id_Siembra || !Id_Responsable || !Hor_Muestreo || !Pes_Promedio) {
        console.warn('Todos los campos son obligatorios');
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        // Buscar el registro de muestreo por su ID
        const muestreo = await MuestreoModel.findByPk(Id_Muestreo);
        if (muestreo) {
            // Actualizar el registro de muestreo con los datos proporcionados
            await muestreo.update({
                Fec_Muestreo,
                Num_Peces,
                Obs_Muestreo,
                Pes_Esperado,
                Id_Siembra,
                Id_Responsable,
                Hor_Muestreo,
                Pes_Promedio
            });
            console.log(`Registro de muestreo con ID ${Id_Muestreo} actualizado exitosamente`);
            res.status(200).json(muestreo);
            return;
        }

        // Si el registro no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Registro de muestreo no encontrado' });
    } catch (error) {
        // Manejar errores en caso de fallo en la actualización
        console.error('Error al actualizar registro de muestreo:', error);
        res.status(500).json({ message: 'Error al actualizar registro de muestreo', error: error.message });
    }
};

// Borrar un registro de muestreo
export const deleteMuestreo = async (req, res) => {
    const { Id_Muestreo } = req.params;

    // Verificar que el ID de muestreo está presente
    if (!Id_Muestreo) {
        console.warn('Id_Muestreo es requerido');
        res.status(400).json({ message: 'Id_Muestreo es requerido' });
        return;
    }

    try {
        // Buscar el registro de muestreo por su ID
        const muestreo = await MuestreoModel.findByPk(Id_Muestreo);
        if (muestreo) {
            // Eliminar el registro de muestreo
            await muestreo.destroy();
            console.log(`Registro de muestreo con ID ${Id_Muestreo} eliminado exitosamente`);
            res.status(200).json({ message: 'Registro de muestreo eliminado' });
            return;
        }

        // Si el registro no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Registro de muestreo no encontrado' });
    } catch (error) {
        // Manejar errores en caso de fallo en la eliminación
        console.error('Error al eliminar registro de muestreo:', error);
        res.status(500).json({ message: 'Error al eliminar registro de muestreo', error: error.message });
    }
};
