<<<<<<< HEAD
import express from "express";
import { createSiembra, deleteSiembra, getAllSiembra, getSiembra, updateSiembra } from "../controllers/siembraController.js";

const router = express.Router();

// Rutas para Siembra
router.get('/siembra', getAllSiembra);
router.get('/siembra/:id', getSiembra);
router.post('/siembra', createSiembra);
router.put('/siembra/:id', updateSiembra);
router.delete('/siembra/:id', deleteSiembra);

export default router;
=======
import express from "express";
import { createSiembra, deleteSiembra, getAllSiembra, getSiembra, updateSiembra } from "../controllers/siembraController.js";

const router = express.Router();

// Rutas para Siembra
router.get('/siembra', getAllSiembra);
router.get('/siembra/:id', getSiembra);
router.post('/siembra', createSiembra);
router.put('/siembra/:id', updateSiembra);
router.delete('/siembra/:id', deleteSiembra);

export default router;
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
