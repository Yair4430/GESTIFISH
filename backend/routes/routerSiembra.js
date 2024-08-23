import express from 'express';
import { 
    getAllSiembra, 
    getSiembra, 
    createSiembra, 
    updateSiembra, 
    deleteSiembra, 
    getSiembraByFechaInicio 
} from '../controllers/siembraController.js';

const routerSiembra = express.Router();

routerSiembra.get('/', getAllSiembra);
routerSiembra.get('/Fec_Siembra/:Fec_Siembra', getSiembraByFechaInicio);  // Ruta para consultar por fecha
routerSiembra.get('/:Id_Siembra', getSiembra);
routerSiembra.post('/', createSiembra);
routerSiembra.put('/:Id_Siembra', updateSiembra);
routerSiembra.delete('/:Id_Siembra', deleteSiembra);

export default routerSiembra;