import express from 'express';
import * as controller from '../controllers/arquivoController.js';
import * as imagemController from '../controllers/imagemController.js'
import { upload } from './../lib/middleware/fileGate.js';

const router = express.Router();


router.post('/:id/capa', upload.single('capa'), controller.uploadCapa);
router.get('/:id/capa', controller.buscarCapa);
router.delete('/:id/capa', controller.deletarCapa);

router.post('/:id/Imagem', upload.single('imagem'), controller.uploadImagem);
router.get('/:id/Imagem', controller.buscarImagem);
router.delete('/:id/Imagem', controller.deletarImagem);

router.post('/', imagemController.criar);
router.get('/', imagemController.buscarTodos);
router.get('/:id', imagemController.buscarPorId);
router.put('/:id', imagemController.atualizar);
router.delete('/:id', imagemController.deletar);
export default router;
