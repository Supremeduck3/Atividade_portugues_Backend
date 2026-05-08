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

        if (!fatosLivro){
            return res.status(400).json({ error: 'O campo "fatosLivro" é obrigatório!' });
        }
        if (!fatosLivro_en){
            return res.status(400).json({ error: 'O campo "fatosLivro_en" é obrigatório!' });
        }
        if (autor === undefined || autor === null) {
            return res.status(400).json({ error: 'O campo "autor" é obrigatório!' });
        }
        if (autor_en === undefined || autor_en === null) {
            return res.status(400).json({ error: 'O campo "autor_en" é obrigatório!' });
        }
        if ( contexto === undefined || contexto === null) {
            return res.status(400).json({ error: 'O campo "contexto" é obrigatório!' });
        }
        if (contexto_en === undefined || contexto_en === null) {
            return res.status(400).json({ error: 'O campo "contexto_en" é obrigatório!' });
        }

        const Curiosidades = new CuriosidadesModel({ fatosLivro, fatosLivro_en, autor, autor_en, contexto, contexto_en});
        const data = await Curiosidades.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await CuriosidadesModel.buscarTodos(req.query);

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

        const Curiosidades = await CuriosidadesModel.buscarPorId(parseInt(id));

        if (!Curiosidades) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Curiosidades });
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

        const Curiosidades = await DicaModel.buscarPorId(parseInt(id));

        if (!Curiosidades) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.fatosLivro !== undefined) {
            Curiosidades.fatosLivro = req.body.fatosLivro;
        }
        if (req.body.fatosLivro_en !== undefined) {
            Curiosidades.fatosLivro_en = req.body.fatosLivro_en;
        }
        if (req.body.autor !== undefined) {
            Curiosidades.autor = req.body.autor;
        }
        if (req.body.autor_en !== undefined) {
            Curiosidades.autor_en = req.body.autor_en;
        }
        if (req.body.contexto !== undefined) {
            Curiosidades.contexto = parseFloat(req.body.contexto);
        }
        if (req.body.contexto_en !== undefined) {
            Curiosidades.contexto_en = parseFloat(req.body.contexto_en);
        }

        const data = await Curiosidades.atualizar();

        return res.status(200).json({ message: `O registro "${data.fatosLivro || fatosLivro_en || autor || autor_en || contexto || contexto_en} " foi atualizado com sucesso!, data `});
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

        const Curiosidades = await DicaModel.buscarPorId(parseInt(id));

        if (!Curiosidades) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Curiosidades.deletar();

        return res
            .status(200)
            .json({
                message: `O registro ${
                    Curiosidades.fatosLivro ||
                    fatosLivro_en ||
                    autor ||
                    autor_en ||
                    contexto ||
                    contexto_en
                }" foi deletado com sucesso!, deletado: Dica `,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
