import express from 'express';
import * as livro from '../controllers/livroController.js';

const router = express.Router();


router.post('/', livro.criar);
router.get('/', livro.buscarTodos);
router.get('/:id', livro.buscarPorId);
router.put('/:id', livro.atualizar);
router.delete('/:id', livro.deletar);
export default router;
