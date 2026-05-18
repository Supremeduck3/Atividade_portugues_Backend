import express from 'express';
import * as controller from '../controllers/arquivoController.js';
import { upload } from './../lib/middleware/fileGate.js';

const router = express.Router();

router.post('/:id/capa', upload.single('capa'), controller.uploadCapa);
router.get('/:id/capa', controller.buscarCapa);
router.delete('/:id/capa', controller.deletarCapa);

export default router;
