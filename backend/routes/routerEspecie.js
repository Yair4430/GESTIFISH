import express from "express";
import { createEspecie, deleteEspecie, getAllEspecie, getEspecie, updateEspecie } from "../controllers/especieController.js";

const router = express.Router();

// Rutas para Especie
router.get('/especie', getAllEspecie);
router.get('/especie/:id', getEspecie);
router.post('/especie', createEspecie);
router.put('/especie/:id', updateEspecie);
router.delete('/especie/:id', deleteEspecie);

export default router;
