import express from "express";
import { createEstanque, deleteEstanque, getAllEstanque, getEstanque, updateEstanque } from "../controllers/estanqueController.js";

const router = express.Router();

// Rutas para Estanque
router.get('/estanque', getAllEstanque);
router.get('/estanque/:id', getEstanque);
router.post('/estanque', createEstanque);
router.put('/estanque/:id', updateEstanque);
router.delete('/estanque/:id', deleteEstanque);

export default router;
