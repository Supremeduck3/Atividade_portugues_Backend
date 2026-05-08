import express from 'express';
import * as quiz from '../controllers/quizController.js';

const router = express.Router();

router.post('/', quiz.criar);
router.get('/', quiz.buscarTodos);
router.get('/:id', quiz.buscarPorId);
router.put('/:id', quiz.atualizar);
router.delete('/:id', quiz.deletar);

export default router;
