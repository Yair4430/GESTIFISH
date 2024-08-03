import express from "express";
import { createResponsable, deleteResponsable, getAllResponsable, getResponsable, updateResponsable } from "../controllers/responsableController.js";

const router = express.Router();

// Rutas para Responsable
router.get('/responsable', getAllResponsable);
router.get('/responsable/:id', getResponsable);
router.post('/responsable', createResponsable);
router.put('/responsable/:id', updateResponsable);
router.delete('/responsable/:id', deleteResponsable);

export default router;
