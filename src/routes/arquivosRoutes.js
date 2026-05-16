import express from 'express';
import * as controller from '../controllers/arquivoController.js';
import { upload } from './../lib/middleware/fileGate.js';

const router = express.Router();

router.post('/:id/capa', upload.single('capa'), controller.uploadFoto);
router.get('/:id/capa', controller.buscarFoto);
router.delete('/:id/capa', controller.deletarFoto);

export default router;
