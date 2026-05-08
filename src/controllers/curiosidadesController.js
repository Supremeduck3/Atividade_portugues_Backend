import CuriosidadesModel from '../models/CuriosidadesModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            fatosLivro,
            fatosLivro_en,
            autor,
            autor_en,
            contexto,
            contexto_en

        } = req.body;

        if (!conteudo){
            return res.status(400).json({ error: 'O campo "conteudo" é obrigatório!' });
        }
        if (!conteudo_en){
            return res.status(400).json({ error: 'O campo "conteudo_en" é obrigatório!' });
        }
        if (interpretacao === undefined || interpretacao === null) {
            return res.status(400).json({ error: 'O campo "interpretacao" é obrigatório!' });
        }
        if (interpretacao_en === undefined || interpretacao_en === null) {
            return res.status(400).json({ error: 'O campo "interpretacao_en" é obrigatório!' });
        }
        if (temasVestibular === undefined || temasVestibular === null) {
            return res.status(400).json({ error: 'O campo "interpretacao_en" é obrigatório!' });
        }
        if (temasVestibular === undefined || temasVestibular_en === null) {
            return res.status(400).json({ error: 'O campo "interpretacao_en" é obrigatório!' });
        }

        const Dica = new ExemploModel({ conteudo, conteudo_en, interpretacao, interpretacao_en, temasVestibular, temasVestibular_en});
        const data = await Dica.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await DicaModel.buscarTodos(req.query);

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

        const Dica = await DicaModel.buscarPorId(parseInt(id));

        if (!Dica) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Dica });
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

        const Dica = await DicaModel.buscarPorId(parseInt(id));

        if (!Dica) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.conteudo !== undefined) {
            Dica.conteudo = req.body.conteudo;
        }
        if (req.body.conteudo_en !== undefined) {
            Dica.conteudo_en = req.body.conteudo_en;
        }
        if (req.body.interpretacao !== undefined) {
            Dica.interpretacao = req.body.interpretacao;
        }
        if (req.body.interpretacao_en !== undefined) {
            Dica.interpretacao_en = req.body.interpretacao_en;
        }
        if (req.body.temasVestibular !== undefined) {
            Dica.temasVestibular = parseFloat(req.body.temasVestibular);
        }
        if (req.body.temasVestibular_en !== undefined) {
            Dica.temasVestibular_en = parseFloat(req.body.temasVestibular_en);
        }

        const data = await Dica.atualizar();

        return res.status(200).json({ message: `O registro "${data.conteudo || conteudo_en}" foi atualizado com sucesso!, data `});
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

        const Dica = await DicaModel.buscarPorId(parseInt(id));

        if (!Dica) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Dica.deletar();

        return res.status(200).json({ message: `O registro ${Dica.conteudo || conteudo_en}" foi deletado com sucesso!, deletado: Dica `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
