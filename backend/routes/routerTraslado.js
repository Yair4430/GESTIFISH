<<<<<<< HEAD
import express from "express";
import { createTraslado, deleteTraslado, getAllTraslado, getTraslado, updateTraslado } from "../controllers/trasladoController.js";

const router = express.Router();

// Rutas para Traslado
router.get('/traslado', getAllTraslado);
router.get('/traslado/:id', getTraslado);
router.post('/traslado', createTraslado);
router.put('/traslado/:id', updateTraslado);
router.delete('/traslado/:id', deleteTraslado);

export default router;
=======
import express from "express";
import { createTraslado, deleteTraslado, getAllTraslado, getTraslado, updateTraslado } from "../controllers/trasladoController.js";

const router = express.Router();

// Rutas para Traslado
router.get('/traslado', getAllTraslado);
router.get('/traslado/:id', getTraslado);
router.post('/traslado', createTraslado);
router.put('/traslado/:id', updateTraslado);
router.delete('/traslado/:id', deleteTraslado);

export default router;
>>>>>>> 65db394cd671beb8a46b6119eed97cee22344cde
