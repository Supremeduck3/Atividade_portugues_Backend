import express from 'express';
import * as curiosidades from '../controllers/curiosidadesController.js';

const router = express.Router();

router.post('/', curiosidades.criar);
router.get('/', curiosidades.buscarTodos);
router.get('/:id', curiosidades.buscarPorId);
router.put('/:id', curiosidades.atualizar);
router.delete('/:id', curiosidades.deletar);

export default router;
