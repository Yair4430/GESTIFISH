import express from "express";
import { createCosecha, deleteCosecha, getAllCosecha, getCosecha, updateCosecha } from "../controllers/cosechaController.js";

const router = express.Router();

// Rutas para Cosecha
router.get('/cosecha', getAllCosecha);
router.get('/cosecha/:id', getCosecha);
router.post('/cosecha', createCosecha);
router.put('/cosecha/:id', updateCosecha);
router.delete('/cosecha/:id', deleteCosecha);

export default router;
