<<<<<<< HEAD
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
=======
import express from "express";

import { createAlimento, deleteAlimento, getAllAlimento, getAlimento, updateAlimento, getQueryAlimento } from "../controllers/alimentacionController.js";

const router = express.Router();

// Rutas para Alimento
router.get('/alimento', getAllAlimento);
router.get('/alimento/:id', getAlimento);
router.post('/alimento', createAlimento);
router.put('/alimento/:id', updateAlimento);
router.delete('/alimento/:id', deleteAlimento);
router.get('/alimento/fec_alimento/:fec_alimento', getQueryAlimento);
  

export default router;
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
