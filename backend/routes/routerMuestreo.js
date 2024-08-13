<<<<<<< HEAD
import express from "express";
import { createMuestreo, deleteMuestreo, getAllMuestreo, getMuestreo, updateMuestreo } from "../controllers/muestreoController.js";

const router = express.Router();

// Rutas para Muestreo
router.get('/muestreo', getAllMuestreo);
router.get('/muestreo/:id', getMuestreo);
router.post('/muestreo', createMuestreo);
router.put('/muestreo/:id', updateMuestreo);
router.delete('/muestreo/:id', deleteMuestreo);

export default router;
=======
import express from "express";
import { createMuestreo, deleteMuestreo, getAllMuestreo, getMuestreo, updateMuestreo } from "../controllers/muestreoController.js";

const router = express.Router();

// Rutas para Muestreo
router.get('/muestreo', getAllMuestreo);
router.get('/muestreo/:id', getMuestreo);
router.post('/muestreo', createMuestreo);
router.put('/muestreo/:id', updateMuestreo);
router.delete('/muestreo/:id', deleteMuestreo);

export default router;
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
