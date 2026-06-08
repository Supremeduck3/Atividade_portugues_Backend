import express from 'express';
import * as personagem from '../controllers/personagemController.js';

const router = express.Router();

router.post('/', personagem.criar);
router.get('/', personagem.buscarTodos);
router.get('/:id', personagem.buscarPorId);
router.put('/:id', personagem.atualizar);
router.delete('/:id', personagem.deletar);

export default router;
