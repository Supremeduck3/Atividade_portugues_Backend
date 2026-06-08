import PersonagemModel from '../models/PersonagemModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            descricao,
            personagem,
        } = req.body;

        if (!personagem) {
            return res.status(400).json({ error: 'O campo "personagem" é obrigatório!' });
        }
        if (!descricao) {
            return res.status(400).json({ error: 'O campo "descricao" é obrigatório!' });
        }

        const Personagem = new PersonagemModel({
            descricao,
            personagem,
        });
        const data = await Personagem.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await PersonagemModel.buscarTodos(req.query);

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

        const Personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!Personagem) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Personagem });
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

        const Personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!Personagem) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.personagem !== undefined) {
            Personagem.personagem = req.body.personagem;
        }
        if (req.body.descricao !== undefined) {
            Personagem.descricao = req.body.descricao;
        }

        const data = await Personagem.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.personagem}" foi atualizado com sucesso!`, data });

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

        const Personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!Personagem) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Personagem.deletar();

        return res.status(200).json({
            message: `O registro "${Personagem.personagem}" foi deletado com sucesso!`,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
