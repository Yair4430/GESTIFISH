import { Op } from 'sequelize';
import CosechaModel from '../models/cosechaModel.js';
import ResponsableModel from '../models/responsableModel.js';
import SiembraModel from '../models/siembraModel.js';

// Obtener todos los registros de cosecha
export const getAllCosecha = async (req, res) => {
    try {
        const cosechas = await CosechaModel.findAll({
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (cosechas.length > 0) {
            res.status(200).json(cosechas);
            return;
        }

        res.status(400).json({ message: 'No hay registros de cosecha' });
        return;
    } catch (error) {
        console.error('Error al obtener los registros de cosecha:', error);
        res.status(500).json({ message: 'Error al obtener los registros de cosecha' });
        return;
    }
};

// Obtener un registro de cosecha por ID
export const getCosechaById = async (req, res) => {
    const { Id_Cosecha } = req.params;

    if (!Id_Cosecha) {
        res.status(400).json({ message: 'Id_Cosecha es requerido' });
        return;
    }

    try {
        const cosecha = await CosechaModel.findByPk(Id_Cosecha, {
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (cosecha) {
            res.status(200).json(cosecha);
            return;
        }

        res.status(404).json({ message: "Registro de cosecha no encontrado." });
        return;
    } catch (error) {
        console.error('Error al recuperar el registro de cosecha:', error);
        res.status(500).json({ message: "Error al recuperar el registro de cosecha." });
        return;
    }
};

// Obtener registros de cosecha por fecha
export const getCosechaByFecha = async (req, res) => {
    const { Fec_Cosecha } = req.params;

    if (!Fec_Cosecha) {
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        const cosechas = await CosechaModel.findAll({
            where: {
                Fec_Cosecha: {
                    [Op.eq]: Fec_Cosecha
                }
            },
            include: [
                { model: ResponsableModel, as: 'responsable' },
                { model: SiembraModel, as: 'siembra' }
            ]
        });

        if (cosechas.length > 0) {
            res.status(200).json(cosechas);
            return;
        }

        res.status(404).json({ message: "No se encontraron registros de cosecha." });
        return;
    } catch (error) {
        console.error('Error al recuperar registros de cosecha por fecha:', error);
        res.status(500).json({ message: "Error al recuperar registros de cosecha por fecha." });
        return;
    }
};

// Crear un registro de cosecha
export const createCosecha = async (req, res) => {
    const { Fec_Cosecha, Can_Peces, Pes_Eviscerado, Pes_Viscerado, Por_Visceras, Id_Responsable, Id_Siembra, Hor_Cosecha, Vlr_Cosecha, Obs_Cosecha } = req.body;

    if (!Fec_Cosecha || !Can_Peces || !Pes_Eviscerado || !Pes_Viscerado || !Por_Visceras || !Id_Responsable || !Id_Siembra || !Hor_Cosecha || !Vlr_Cosecha) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        const nuevaCosecha = await CosechaModel.create(req.body);

        res.status(201).json({ message: "¡Registro de cosecha creado exitosamente!", data: nuevaCosecha });
        return;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return;
        }

        console.error('Error al crear registro de cosecha:', error);
        res.status(500).json({ message: 'Error al crear registro de cosecha', error: error.message });
        return;
    }
};

// Actualizar un registro de cosecha
export const updateCosecha = async (req, res) => {
    const { Id_Cosecha } = req.params;
    const { Fec_Cosecha, Can_Peces, Pes_Eviscerado, Pes_Viscerado, Por_Visceras, Id_Responsable, Id_Siembra, Hor_Cosecha, Vlr_Cosecha, Obs_Cosecha } = req.body;

    if (!Id_Cosecha) {
        res.status(400).json({ message: 'Id_Cosecha es requerido' });
        return;
    }

    if (!Fec_Cosecha || !Can_Peces || !Pes_Eviscerado || !Pes_Viscerado || !Por_Visceras || !Id_Responsable || !Id_Siembra || !Hor_Cosecha || !Vlr_Cosecha) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        const cosecha = await CosechaModel.findByPk(Id_Cosecha);

        if (!cosecha) {
            res.status(404).json({ message: 'Registro de cosecha no encontrado' });
            return;
        }

        await cosecha.update(req.body);

        res.status(200).json({ message: 'Registro de cosecha actualizado con éxito', data: cosecha });
        return;
    } catch (error) {
        console.error('Error al actualizar registro de cosecha:', error);
        res.status(500).json({ message: 'Error al actualizar registro de cosecha', error: error.message });
        return;
    }
};

// Borrar un registro de cosecha
export const deleteCosecha = async (req, res) => {
    const { Id_Cosecha } = req.params;

    if (!Id_Cosecha) {
        res.status(400).json({ message: 'Id_Cosecha es requerido' });
        return;
    }

    try {
        const cosecha = await CosechaModel.findByPk(Id_Cosecha);
        
        if (cosecha) {
            await cosecha.destroy();

            const cosechaEliminada = await CosechaModel.findByPk(Id_Cosecha);
            if (!cosechaEliminada) {
                res.status(200).json({ message: 'Registro de cosecha eliminado con éxito' });
                return;
            }
        }

        res.status(404).json({ message: 'Registro de cosecha no encontrado' });
        return;
    } catch (error) {
        console.error('Error al eliminar registro de cosecha:', error);
        res.status(500).json({ message: 'Error al eliminar registro de cosecha', error: error.message });
        return;
    }
};
