import prisma from '../lib/services/prismaClient.js';

export default class CuriosidadesModel {
    constructor({
        id = null,
        fatosLivro,
        fatosLivro_en,
        autor,
        autor_en,
        contexto,
        contexto_en = null,

    } = {}) {
        this.id = id;
        this.fatosLivro = this.fatosLivro;
        this.fatosLivro_en = this.fatosLivro_en;
        this.autor = this.autor;
        this.autor = this.autor;
        this.contexto = this.contexto;
        this.contexto_en = this.contexto_en;
    }

    async criar() {
        return prisma.curiosidades.create({
            data: {
                fatosLivro: this.fatosLivro,
                fatosLivro_en: this.fatosLivro_en,
                autor: this.autor,
                autor_en: this.autor_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
            },
        });
    }

    async atualizar() {
        return prisma.curiosidades.update({
            where: { id: this.id },
            data: {
                fatosLivro: this.fatosLivro,
                fatosLivro_en: this.fatosLivro_en,
                autor: this.autor,
                autor_en: this.autor_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
            },
        });
    }

    async deletar() {
        return prisma.curiosidades.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.fatosLivro) {
            where.fatosLivro = { contains: filtros.fatosLivro, mode: 'insensitive' };
        }
        if (filtros.fatosLivro_en) {
            where.fatosLivro_en = { contains: filtros.fatosLivro_en, mode: 'insensitive' };
        }
        if (filtros.autor !== undefined) {
            where.autor = filtros.autor === 'true';
        }
        if (filtros.autor_en !== undefined) {
            where.autor_en = filtros.autor_en === 'true';
        }
        if (filtros.contexto !== undefined) {
            where.contexto = parseFloat(filtros.contexto);
        }
        if (filtros.contexto_en !== undefined) {
            where.contexto_en = parseFloat(filtros.contexto_en);
        }

        return prisma.curiosidades.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.curiosidades.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new curiosidadesModel(data);
    }
}
