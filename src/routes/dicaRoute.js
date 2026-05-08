import express from 'express';
import * as dica from '../controllers/dicaController.js';

const router = express.Router();

router.post('/', dica.criar);
router.get('/', dica.buscarTodos);
router.get('/:id', dica.buscarPorId);
router.put('/:id', dica.atualizar);
router.delete('/:id', dica.deletar);

export default router;
