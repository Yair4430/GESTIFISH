import express from "express";
import { createActividad, deleteActividad, getAllActividad, getActividad, updateActividad } from "../controllers/actividadController.js";

const router = express.Router();

// Rutas para Actividad
router.get('/actividad', getAllActividad);
router.get('/actividad/:id', getActividad);
router.post('/actividad', createActividad);
router.put('/actividad/:id', updateActividad);
router.delete('/actividad/:id', deleteActividad);

export default router;
