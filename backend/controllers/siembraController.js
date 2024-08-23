import SiembraModel from "../models/siembraModel.js";
import ResponsableModel from "../models/responsableModel.js";
import EspecieModel from "../models/especieModel.js";
import EstanqueModel from "../models/estanqueModel.js";

// Obtener todos los registros de siembras
export const getAllSiembra = async (req, res) => {
    try {
        // Buscar todas las siembras e incluir los datos relacionados
        const siembras = await SiembraModel.findAll({
            include: [
                { model: ResponsableModel, attributes: ['Nom_Responsable'] },
                { model: EspecieModel, attributes: ['Nom_Especie'] },
                { model: EstanqueModel, attributes: ['Nom_Estanque'] },
            ],
        });

        if (siembras.length > 0) {
            // Si se encuentran siembras, devolverlas con status 200
            res.status(200).json(siembras);
            return;
        }

        // Si no se encuentran siembras, devolver un mensaje con status 404
        res.status(404).json({ message: 'No se encontraron siembras' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al obtener siembras:', error);
        res.status(500).json({ message: 'Error al obtener siembras' });
    }
};

// Obtener un registro de siembra por ID
export const getSiembra = async (req, res) => {
    const { Id_Siembra } = req.params;

    // Verificar que el ID de siembra está presente
    if (!Id_Siembra) {
        res.status(400).json({ message: 'Id_Siembra es requerido' });
        return;
    }

    try {
        // Buscar la siembra por su ID e incluir los datos relacionados
        const siembra = await SiembraModel.findByPk(Id_Siembra, {
            include: [
                { model: ResponsableModel, attributes: ['Nom_Responsable'] },
                { model: EspecieModel, attributes: ['Nom_Especie'] },
                { model: EstanqueModel, attributes: ['Nom_Estanque'] }
            ]
        });

        if (siembra) {
            // Si se encuentra la siembra, devolverla con status 200
            res.status(200).json(siembra);
            return;
        }

        // Si la siembra no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Siembra no encontrada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al recuperar siembra:', error);
        res.status(500).json({ message: 'Error al recuperar siembra' });
    }
};

// Obtener registros de siembras por fecha de inicio
export const getSiembraByFechaInicio = async (req, res) => {
    const { Fec_Siembra } = req.params;

    // Verificar que la fecha de siembra está presente
    if (!Fec_Siembra) {
        res.status(400).json({ message: 'Fecha es requerida' });
        return;
    }

    try {
        // Buscar siembras que coincidan con la fecha de inicio e incluir los datos relacionados
        const siembras = await SiembraModel.findAll({
            where: { Fec_Siembra },
            include: [
                { model: ResponsableModel, attributes: ['Nom_Responsable'] },
                { model: EspecieModel, attributes: ['Nom_Especie'] },
                { model: EstanqueModel, attributes: ['Nom_Estanque'] }
            ]
        });

        if (siembras.length > 0) {
            // Si se encuentran siembras, devolverlas con status 200
            res.status(200).json(siembras);
            return;
        }

        // Si no se encuentran siembras, devolver un mensaje con status 404
        res.status(404).json({ message: 'No se encontraron siembras para la fecha proporcionada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la consulta
        console.error('Error al recuperar siembras por fecha de inicio:', error);
        res.status(500).json({ message: 'Error al recuperar siembras por fecha de inicio' });
    }
};

// Crear un nuevo registro de siembra
export const createSiembra = async (req, res) => {
    try {
        // Crear una nueva siembra con los datos proporcionados
        const newSiembra = await SiembraModel.create(req.body);
        res.status(201).json({ message: '¡Siembra creada exitosamente!', data: newSiembra });
    } catch (error) {
        // Manejar errores en caso de fallo en la creación
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return;
        }

        console.error('Error al crear siembra:', error);
        res.status(500).json({ message: 'Error al crear siembra' });
    }
};

// Actualizar un registro de siembra
export const updateSiembra = async (req, res) => {
    const { Id_Siembra } = req.params;

    // Verificar que el ID de siembra está presente
    if (!Id_Siembra) {
        res.status(400).json({ message: 'Id_Siembra es requerido' });
        return;
    }

    try {
        // Buscar la siembra por su ID
        const siembra = await SiembraModel.findByPk(Id_Siembra);

        if (siembra) {
            // Actualizar la siembra con los datos proporcionados
            await siembra.update(req.body);
            res.status(200).json({ message: '¡Siembra actualizada exitosamente!', siembra });
            return;
        }

        // Si la siembra no se encuentra, devolver un mensaje con status 404
        res.status(404).json({ message: 'Siembra no encontrada' });
    } catch (error) {
        // Manejar errores en caso de fallo en la actualización
        console.error('Error al actualizar siembra:', error);
        res.status(500).json({ message: 'Error al actualizar siembra', error: error.message });
    }
};

// Borrar un registro de siembra
export const deleteSiembra = async (req, res) => {
    const { Id_Siembra } = req.params;

    // Verificar que el ID de siembra está presente
    if (!Id_Siembra) {
        res.status(400).json({ message: 'Id_Siembra es requerido' });
        return;
    }

    try {
        // Buscar la siembra por su ID
        const siembra = await SiembraModel.findByPk(Id_Siembra);

        if (siembra) {
            // Eliminar la siembra
            await siembra.destroy();
            // Verificar si la siembra ha sido eliminada
            const siembraEliminada = await SiembraModel.findByPk(Id_Siembra);

            if (!siembraEliminada) {
                res.status(200).json({ message: '¡Siembra eliminada exitosamente!' });
                return;
            }

            // Si la siembra aún existe después de intentar eliminar, devolver un mensaje con status 500
            res.status(500).json({ message: 'Error al eliminar siembra' });
        }
        
    } catch (error) {
        // Manejar errores en caso de fallo en la eliminación
        console.error('Error al eliminar siembra:', error);
        res.status(500).json({ message: 'Error al eliminar siembra', error: error.message });
    }
};
