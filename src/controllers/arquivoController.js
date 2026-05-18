import livroModel from '../models/LivroModel.js';
import ImagemModel from '../models/imagensModel.js';
import {
    upload as uploadStorage,
    deletar as deletarStorage,
} from '../lib/helpers/arquivoHelper.js';

const uploadArquivo = (model, tipo) => async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const livro = await model.buscarPorId(parseInt(id));
        if (!livro) return res.status(404).json({ error: 'Registro não encontrado.' });
        if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

        if (livro[tipo]) await deletarStorage(livro[tipo]);
        livro[tipo] = await uploadStorage(id, req.file);
        const data = await livro.atualizar();

        return res.status(200).json({ message: `${tipo} enviado com sucesso!`, url: data[tipo] });
    } catch (error) {
        return res.status(500).json({ error: `Erro ao fazer upload do ${tipo}.` });
    }
};

const buscarArquivo = (model,tipo) => async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const livro = await model.buscarPorId(parseInt(id));
        if (!livro) return res.status(404).json({ error: 'Registro não encontrado.' });
        if (!livro[tipo]) return res.status(404).json({ error: `Nenhuma ${tipo} cadastrado.` });

        return res.status(200).json({ url: livro[tipo] });
    } catch (error) {
        return res.status(500).json({ error: `Erro ao buscar ${tipo}.` });
    }
};

const deletarArquivo = (model, tipo) => async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const livro = await model.buscarPorId(parseInt(id));
        if (!livro) return res.status(404).json({ error: 'Registro não encontrado.' });
        if (!livro[tipo]) return res.status(404).json({ error: `Nenhuma ${tipo} para remover.` });

        await deletarStorage(livro[tipo]);
        livro[tipo] = null;
        await livro.atualizar();

        return res.status(200).json({ message: `${tipo} removido com sucesso!` });
    } catch (error) {
        return res.status(500).json({ error: `Erro ao remover ${tipo}.` });
    }
};

export const uploadCapa = uploadArquivo(livroModel, 'capa');
export const buscarCapa = buscarArquivo(livroModel, 'capa');
export const deletarCapa = deletarArquivo(livroModel, 'capa');

export const uploadImagem = uploadArquivo(ImagemModel, 'foto');
export const buscarImagem = buscarArquivo(ImagemModel, 'foto');
export const deletarImagem = deletarArquivo(ImagemModel, 'foto');
