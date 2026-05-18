import ImagemModel from '../models/ImagensModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            imagem,
            descricao
        } = req.body;

        if (!imagem){
            return res.status(400).json({ error: 'O campo "imagem" é obrigatório!' });
        }
        if (!descricao){
            return res.status(400).json({ error: 'O campo "descricao" é obrigatório!' });
        }

        const Imagem = new ImagemModel({ descricao, imagem });

        const data = await Imagem.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await ImagemModel.buscarTodos(req.query);

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

        const Imagem = await ImagemModel.buscarPorId(parseInt(id));

        if (!Imagem) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Imagem });
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

        const Imagem = await ImagemModel.buscarPorId(parseInt(id));

        if (!Imagem) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.descricao !== undefined) {
            Imagem.descricao = req.body.descricao;
        }
        if (req.body.imagem !== undefined) {
            Imagem.imagem = req.body.imagem;
        }


        const data = await Imagem.atualizar();

        return res.status(200).json({ message: `O registro foi atualizado com sucesso!`});
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

        const Imagem = await ImagemModel.buscarPorId(parseInt(id));

        if (!Imagem) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Imagem.deletar();

        return res.status(200).json({ message: `O registro foi deletado com sucesso!`});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
