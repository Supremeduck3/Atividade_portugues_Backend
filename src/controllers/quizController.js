import QuizModel from '../models/QuizModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { conteudoQuestao, conteudoQuestao_en, RespostaQuestao, RespostaQuestao_en } =
            req.body;

        if (!conteudoQuestao) {
            return res.status(400).json({ error: 'O campo "conteudoQuestao" é obrigatório!' });
        }
        if (!conteudoQuestao_en) {
            return res.status(400).json({ error: 'O campo "conteudoQuestao_en" é obrigatório!' });
        }
        if (RespostaQuestao === undefined || RespostaQuestao === null) {
            return res.status(400).json({ error: 'O campo "RespostaQuestao" é obrigatório!' });
        }
        if (RespostaQuestao_en === undefined || RespostaQuestao_en === null) {
            return res.status(400).json({ error: 'O campo "RespostaoQuestao_en" é obrigatório!' });
        }

        const Quiz = new ExemploModel({
            conteudoQuestao,
            conteudoQuestao_en,
            RespostaQuestao,
            RespostaQuestao_en,
        });
        const data = await Quiz.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await QuizModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const Quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!Quiz) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Quiz });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const Quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!Quiz) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.conteudoQuestao !== undefined) {
            Quiz.conteudoQuestao = req.body.conteudoQuestao;
        }
        if (req.body.conteudoQuestao_en !== undefined) {
            Quiz.conteudoQuestao_en = req.body.conteudoQuestao_en;
        }
        if (req.body.RespostaQuestao !== undefined) {
            Quiz.RespostaQuestao = req.body.RespostaQuestao;
        }
        if (req.body.RespostaQuestao_en !== undefined) {
            Quiz.RespostaQuestao_en = req.body.RespostaQuestao_en;
        }

        const data = await Quiz.atualizar();

        return res
            .status(200)
            .json({
                message: `O registro "${
                    data.conteudoQuestao ||
                    conteudoQuestao_en ||
                    RespostaQuestao ||
                    RespostaQuestao_en
                }" foi atualizado com sucesso!, data `,
            });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const Quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!Quiz) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Quiz.deletar();

        return res
            .status(200)
            .json({
                message: `O registro ${
                    Quiz.conteudoQuestao || conteudoQuestao_en
                }" foi deletado com sucesso!, deletado: Dica `,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
