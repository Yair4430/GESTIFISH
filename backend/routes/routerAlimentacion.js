import express from "express";

import { createAlimento, deleteAlimento, getAllAlimento, getAlimento, updateAlimento, getQueryAlimento } from "../controllers/alimentacionController.js";

const routerAlimento = express.Router();

// Rutas para Alimento
routerAlimento.get('/', getAllAlimento);
routerAlimento.get('/:alimento', getAlimento);
routerAlimento.post('/', createAlimento);
routerAlimento.put('/:alimento', updateAlimento);
routerAlimento.delete('/:alimento', deleteAlimento);
routerAlimento.get('/fec_alimento/:fec_alimento', getQueryAlimento);
  

export default routerAlimento;