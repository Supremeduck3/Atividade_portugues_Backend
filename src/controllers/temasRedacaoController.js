import TemasRedacaoModel from '../models/TemasRedacaoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            assunto,
            assunto_en,
            dificuldade,
        } = req.body;

        if (!assunto){
            return res.status(400).json({ error: 'O campo "assunto" é obrigatório!' });
        }
        if (!assunto_en){
            return res.status(400).json({ error: 'O campo "assunto_en" é obrigatório!' });
        }
        if (dificuldade === undefined || dificuldade === null) {
            return res.status(400).json({ error: 'O campo "dificuldade" é obrigatório!' });
        }

        const TemasRedacao = new TemasRedacaoModel({ assunto, assunto_en, dificuldade });
        const data = await TemasRedacao.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await TemasRedacaoModel.buscarTodos(req.query);

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
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const registro = await TemasRedacaoModel.buscarPorId(parseInt(id));

        if (!registro) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: registro });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro interno.' });
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

        const TemasRedacao = await TemasRedacaoModel.buscarPorId(parseInt(id));

        if (!TemasRedacao) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.assunto !== undefined) {
            TemasRedacao.assunto = req.body.assunto;
        }
        if (req.body.assunto_en !== undefined) {
            TemasRedacao.assunto_en = req.body.assunto_en;
        }
        if (req.body.dificuldade !== undefined) {
            TemasRedacao.dificuldade = req.body.dificuldade;
        }

        const data = await TemasRedacao.atualizar();

        return res.status(200).json({ message: `O registro "${data.assunto || assunto_en}" foi atualizado com sucesso!, data `});
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

        const TemasRedacao = await TemasRedacaoModel.buscarPorId(parseInt(id));

        if (!TemasRedacao) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await TemasRedacao.deletar();

        return res.status(200).json({ message: `O registro ${TemasRedacao.assunto || assunto_en}" foi deletado com sucesso!, deletado: Dica `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
