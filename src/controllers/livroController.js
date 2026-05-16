import LivroModel from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            titulo,
            titulo_en,
            capa,
            autor,
            anoPublicacao,
            genero,
            genero_en,
            resumo,
            resumo_en,
            contexto,
            contexto_en,
            estiloEscrita,
            estiloEscrita_en,
            enredo,
            enredo_en,
            verossimilhanca,
            verossimilhanca_en,
            personagens,
            caracteristicasLiterarias,
            caracteristicasLiterarias_en,
            conclusao,
            conclusao_en,
        } = req.body;

        if (!titulo) {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (!titulo_en) {
            return res.status(400).json({ error: 'O campo "titulo_en" é obrigatório!' });
        }
        if (capa === undefined || capa === null) {
            return res.status(400).json({ error: 'O campo "capa" é obrigatório!' });
        }
        if (autor === undefined || autor === null) {
            return res.status(400).json({ error: 'O campo "autor" é obrigatório!' });
        }
        if (anoPublicacao === undefined || anoPublicacao === null) {
            return res.status(400).json({ error: 'O campo "anoPublicacao" é obrigatório!' });
        }
        if (genero === undefined || genero === null) {
            return res.status(400).json({ error: 'O campo "genero" é obrigatório!' });
        }
        if (genero_en === undefined || genero_en === null) {
            return res.status(400).json({ error: 'O campo "genero_en" é obrigatório!' });
        }
        if (resumo === undefined || resumo === null) {
            return res.status(400).json({ error: 'O campo "resumo" é obrigatório!' });
        }
        if (resumo_en === undefined || resumo_en === null) {
            return res.status(400).json({ error: 'O campo "resumo_en" é obrigatório!' });
        }
        if (contexto === undefined || contexto === null) {
            return res.status(400).json({ error: 'O campo "contexto" é obrigatório!' });
        }
        if (contexto_en === undefined || contexto_en === null) {
            return res.status(400).json({ error: 'O campo "contexto_en" é obrigatório!' });
        }
        if (estiloEscrita === undefined || estiloEscrita === null) {
            return res.status(400).json({ error: 'O campo "estiloEscrita" é obrigatório!' });
        }
        if (estiloEscrita_en === undefined || estiloEscrita_en === null) {
            return res.status(400).json({ error: 'O campo "estiloEscrita_en" é obrigatório!' });
        }
        if (enredo === undefined || enredo === null) {
            return res.status(400).json({ error: 'O campo "enredo" é obrigatório!' });
        }
        if (enredo_en === undefined || enredo_en === null) {
            return res.status(400).json({ error: 'O campo "enredo_en" é obrigatório!' });
        }
        if (verossimilhanca === undefined || verossimilhanca === null) {
            return res.status(400).json({ error: 'O campo "verossimilhanca" é obrigatório!' });
        }
        if (verossimilhanca_en === undefined || verossimilhanca_en === null) {
            return res.status(400).json({ error: 'O campo "verossimilhanca_en" é obrigatório!' });
        }
        if (personagens === undefined || personagens === null) {
            return res.status(400).json({ error: 'O campo "personagem" é obrigatório!' });
        }
        if (caracteristicasLiterarias === undefined || caracteristicasLiterarias === null) {
            return res.status(400).json({ error: 'O campo "caracteristicasLiterarias" é obrigatório!' });
        }
        if (caracteristicasLiterarias_en === undefined || caracteristicasLiterarias_en === null) {
            return res.status(400).json({ error: 'O campo "verossimilhanca_en" é obrigatório!' });
        }
        if (conclusao === undefined || conclusao === null) {
            return res.status(400).json({ error: 'O campo "conclusao" é obrigatório!' });
        }
        if (conclusao_en === undefined || conclusao_en === null) {
            return res.status(400).json({ error: 'O campo "verossimilhanca_en" é obrigatório!' });
        }

        const Livro = new LivroModel({
            titulo,
            titulo_en,
            capa,
            autor,
            anoPublicacao,
            genero,
            genero_en,
            resumo,
            resumo_en,
            contexto,
            contexto_en,
            estiloEscrita,
            estiloEscrita_en,
            enredo,
            enredo_en,
            verossimilhanca,
            verossimilhanca_en,
            personagens,
            caracteristicasLiterarias,
            caracteristicasLiterarias_en,
            conclusao,
            conclusao_en,
        });
        const data = await Livro.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await LivroModel.buscarTodos(req.query);

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

        const Livro = await LivroModel.buscarPorId(parseInt(id));

        if (!Livro) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Livro });
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

        const Livro = await LivroModel.buscarPorId(parseInt(id));

        if (!Livro) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) {
            Livro.titulo = req.body.titulo;
        }
        if (req.body.titulo_en !== undefined) {
            Livro.titulo_en = req.body.titulo_en;
        }
        if (req.body.capa !== undefined) {
            Livro.capa = req.body.capa;
        }
        if (req.body.autor !== undefined) {
            Livro.autor = req.body.autor;
        }
        if (req.body.anoPublicacao !== undefined) {
            Livro.anoPublicacao = req.body.anoPublicacao;
        }
        if (req.body.genero !== undefined) {
            Livro.genero = req.body.genero;
        }
        if (req.body.genero_en !== undefined) {
            Livro.genero_en = req.body.genero_en;
        }
        if (req.body.resumo !== undefined) {
            Livro.resumo = req.body.resumo;
        }
        if (req.body.resumo_en !== undefined) {
            Livro.resumo_en = req.body.resumo_en;
        }
        if (req.body.contexto !== undefined) {
            Livro.contexto = req.body.contexto;
        }
        if (req.body.contexto_en !== undefined) {
            Livro.contexto_en = req.body.contexto_en;
        }
        if (req.body.estiloEscrita !== undefined) {
            Livro.estiloEscrita = req.body.estiloEscrita;
        }
        if (req.body.estiloEscrita_en !== undefined) {
            Livro.estiloEscrita_en = req.body.estiloEscrita_en;
        }
        if (req.body.enredo !== undefined) {
            Livro.enredo = req.body.enredo;
        }
        if (req.body.enredo_en !== undefined) {
            Livro.enredo_en = req.body.enredo_en;
        }
        if (req.body.verossimilhanca !== undefined) {
            Livro.verossimilhanca = req.body.verossimilhanca;
        }
        if (req.body.verossimilhanca_en !== undefined) {
            Livro.verossimilhanca_en = req.body.verossimilhanca_en;
        }
        if (req.body.personagens !== undefined) {
            Livro.personagens = req.body.personagens;
        }
        if (req.body.caracteristicasLiterarias !== undefined) {
            Livro.caracteristicasLiterarias = req.body.caracteristicasLiterarias;
        }
        if (req.body.caracteristicasLiterarias_en !== undefined) {
            Livro.caracteristicasLiterarias_en = req.body.caracteristicasLiterarias_en;
        }
        if (req.body.conclusao !== undefined) {
            Livro.conclusao = req.body.conclusao;
        }
        if (req.body.conclusao_en !== undefined) {
            Livro.conclusao_en = req.body.conclusao_en;
        }

        const data = await Livro.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data });

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

        const Livro = await LivroModel.buscarPorId(parseInt(id));

        if (!Livro) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Livro.deletar();

        return res.status(200).json({
            message: `O registro ${
                Livro.titulo ||
                titulo_en ||
                capa ||
                autor ||
                anoPublicacao ||
                genero ||
                genero_en ||
                resumo ||
                resumo_en ||
                estiloEscrita ||
                estiloEscrita_en ||
                enredo ||
                enredo_en ||
                verossimilhanca_en ||
                verossimilhanca ||
                personagens ||
                caracteristicasLiterarias ||
                caracteristicasLiterarias_en ||
                conclusao ||
                conclusao_en
            }" foi deletado com sucesso!, deletado: Dica `,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
