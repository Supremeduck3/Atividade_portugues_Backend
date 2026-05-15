import express from 'express';
import * as controller from './../controllers/arquivoControllers.js';
import { upload } from './../lib/middleware/fileGate.js';

const router = express.Router();

router.post('/:id/foto', upload.single('foto'), controller.uploadFoto);
router.get('/:id/foto', controller.buscarFoto);
router.delete('/:id/foto', controller.deletarFoto);

export default router;
