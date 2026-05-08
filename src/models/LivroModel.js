import prisma from '../lib/services/prismaClient.js';

export default class DicaModel {
    constructor({
        id = null,
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
    } = {}) {
        this.id = id;
        this.titulo = this.titulo;
        this.titulo_en = this.titulo_en;
        this.capa = this.capa;
        this.autor = this.autor;
        this.anoPublicacao = this.anoPublicacao;
        this.genero = this.genero;
        this.genero_en = this.genero_en;
        this.resumo = this.resumo;
        this.resumo_en = this.resumo_en;
        this.contexto = this.contexto;
        this.contexto_en = this.contexto_en;
        this.estiloEscrita = this.estiloEscrita;
        this.estiloEscrita_en = this.estiloEscrita_en;
        this.enredo = this.enredo;
        this.enredo_en = this.enredo_en;
        this.verossimilhanca = this.verossimilhanca;
        this.verossimilhanca_en = this.verossimilhanca_en;
        this.personagens = this.personagens;
        this.caracteristicasLiterarias = this.caracteristicasLiterarias;
        this.caracteristicasLiterarias_en = this.caracteristicasLiterarias_en;
        this.conclusao = this.conclusao;
        this.conclusao_en = this.conclusao_en;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.titulo,
                titulo_en: this.titulo_en,
                capa: this.capa,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                genero: this.genero,
                genero_en: this.genero_en,
                resumo: this.resumo,
                resumo_en: this.resumo_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
                estiloEscrita: this.estiloEscrita,
                estiloEscrita_en: this.estiloEscrita_en,
                enredo: this.enredo,
                enredo_en: this.enredo_en,
                verossimilhanca: this.verossimilhanca,
                verossimilhanca_en: this.verossimilhanca_en,
                personagens: this.personagens,
                caracteristicasLiterarias: this.caracteristicasLiterarias,
                caracteristicasLiterarias_en: this.caracteristicasLiterarias_en,
                conclusao: this.conclusao,
                conclusao_en: this.conclusao_en,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                titulo_en: this.titulo_en,
                capa: this.capa,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                genero: this.genero,
                genero_en: this.genero_en,
                resumo: this.resumo,
                resumo_en: this.resumo_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
                estiloEscrita: this.estiloEscrita,
                estiloEscrita_en: this.estiloEscrita_en,
                enredo: this.enredo,
                enredo_en: this.enredo_en,
                verossimilhanca: this.verossimilhanca,
                verossimilhanca_en: this.verossimilhanca_en,
                personagens: this.personagens,
                caracteristicasLiterarias: this.caracteristicasLiterarias,
                caracteristicasLiterarias_en: this.caracteristicasLiterarias_en,
                conclusao: this.conclusao,
                conclusao_en: this.conclusao_en,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.titulo_en) {
            where.titulo_en = { contains: filtros.titulo_en, mode: 'insensitive' };
        }
        if (filtros.capa !== undefined) {
            where.capa = filtros.capa === 'true';
        }
        if (filtros.autor !== undefined) {
            where.autor = filtros.autor === 'true';
        }
        if (filtros.anoPublicacao !== undefined) {
            where.anoPublicacao = parseFloat(filtros.anoPublicacao);
        }
        if (filtros.genero !== undefined) {
            where.genero = parseFloat(filtros.genero);
        }
        if (filtros.genero_en !== undefined) {
            where.genero_en = parseFloat(filtros.genero_en);
        }
        if (filtros.resumo !== undefined) {
            where.resumo = parseFloat(filtros.resumo);
        }
        if (filtros.resumo_en !== undefined) {
            where.resumo_en = parseFloat(filtros.resumo_en);
        }
        if (filtros.contexto !== undefined) {
            where.contexto = parseFloat(filtros.contexto);
        }
        if (filtros.contexto_en !== undefined) {
            where.contexto_en = parseFloat(filtros.contexto_en);
        }
        if (filtros.estiloEscrita !== undefined) {
            where.estiloEscrita = parseFloat(filtros.estiloEscrita);
        }
        if (filtros.estiloEscrita_en !== undefined) {
            where.estiloEscrita_en = parseFloat(filtros.estiloEscrita_en);
        }
        if (filtros.enredo !== undefined) {
            where.enredo = parseFloat(filtros.enredo);
        }
        if (filtros.enredo_en !== undefined) {
            where.enredo_en = parseFloat(filtros.enredo_en);
        }
        if (filtros.verossimilhanca !== undefined) {
            where.verossimilhanca = parseFloat(filtros.verossimilhanca);
        }
        if (filtros.verossimilhanca_en !== undefined) {
            where.verossimilhanca_en = parseFloat(filtros.verossimilhanca_en);
        }
        if (filtros.personagens !== undefined) {
            where.personagens = parseFloat(filtros.personagens);
        }
        if (filtros.conclusao !== undefined) {
            where.conclusao = parseFloat(filtros.conclusao);
        }
        if (filtros.conclusao_en !== undefined) {
            where.conclusao_en = parseFloat(filtros.conclusao_en);
        }
        if (filtros.caracteristicasLiterarias !== undefined) {
            where.caracteristicasLiterarias = parseFloat(filtros.caracteristicasLiterarias);
        }
        if (filtros.caracteristicasLiterarias_en !== undefined) {
            where.caracteristicasLiterarias_en = parseFloat(filtros.caracteristicasLiterarias_en);
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel(data);
    }
}
