import express from 'express';
import * as usuario from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/', usuario.criar);
router.get('/', usuario.buscarTodos);
router.get('/:id', usuario.buscarPorId);
router.put('/:id', usuario.atualizar);
router.delete('/:id', usuario.deletar);

export default router;
