import express from 'express';
import * as temasRedacao from '../controllers/temasRedacaoController.js';

const router = express.Router();

router.post('/', temasRedacao.criar);
router.get('/', temasRedacao.buscarTodos);
router.get('/:id', temasRedacao.buscarPorId);
router.put('/:id', temasRedacao.atualizar);
router.delete('/:id', temasRedacao.deletar);

export default router;
