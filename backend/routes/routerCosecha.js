<<<<<<< HEAD
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
=======
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
>>>>>>> 65db394cd671beb8a46b6119eed97cee22344cde
