import express from "express";

import { createAlimento, deleteAlimento, getAllAlimento, getAlimento, updateAlimento, getQueryAlimento } from "../controllers/alimentacionController.js";

const routerAlimentacion = express.Router();

// Rutas para Alimento
routerAlimentacion.get('/alimento', getAllAlimento);
routerAlimentacion.get('/alimento/:id', getAlimento);
routerAlimentacion.post('/alimento', createAlimento);
routerAlimentacion.put('/alimento/:id', updateAlimento);
routerAlimentacion.delete('/alimento/:id', deleteAlimento);
routerAlimentacion.get('/alimento/fec_alimento/:fec_alimento', getQueryAlimento);
  

export default routerAlimentacion;