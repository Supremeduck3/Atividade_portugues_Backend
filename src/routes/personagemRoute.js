import express from 'express';
import * as personagem from '../controllers/personagemController.js';

const router = express.Router();

router.post('a/', personagem.criar);
router.get('a/', personagem.buscarTodos);
router.get('a/:id', personagem.buscarPorId);
router.put('a/:id', personagem.atualizar);
router.delete('a/:id', personagem.deletar);

export default router;
