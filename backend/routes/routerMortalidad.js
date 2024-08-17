import express from "express";
import { createMortalidad, deleteMortalidad, getAllMortalidad, getMortalidad, updateMortalidad } from "../controllers/mortalidadController.js";

const router = express.Router();

// Rutas para Mortalidad
router.get('/mortalidad', getAllMortalidad);
router.get('/mortalidad/:id', getMortalidad);
router.post('/mortalidad', createMortalidad);
router.put('/mortalidad/:id', updateMortalidad);
router.delete('/mortalidad/:id', deleteMortalidad);

export default router;
