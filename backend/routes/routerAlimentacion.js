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