import prisma from '../lib/services/prismaClient.js';

export default class TemasRedacaoModel {
    constructor({
        id = null,
        assunto,
        assunto_en,
        dificuldade = true,

    } = {}) {
        this.id = id;
        this.assunto = this.assunto;
        this.assunto_en = this.assunto_en;
        this.dificuldade = this.dificuldade;

    }

    async criar() {
        return prisma.temasRedacao.create({
            data: {
                assunto: this.assunto,
                assunto_en: this.assunto_en,
                dificuldade: this.dificuldade,
            },
        });
    }

    async atualizar() {
        return prisma.temasRedacao.update({
            where: { id: this.id },
            data: {
                assunto: this.assunto,
                assunto_en: this.assunto_en,
                dificuldade: this.dificuldade,
            },
        });
    }

    async deletar() {
        return prisma.temasRedacao.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.assunto) {
            where.assunto = { contains: filtros.assunto, mode: 'insensitive' };
        }
        if (filtros.assunto_en) {
            where.assunto_en = { contains: filtros.assunto_en, mode: 'insensitive' };
        }
        if (filtros.dificuldade !== undefined) {
            where.dificuldade = filtros.dificuldade === 'true';
        }

        return prisma.temasRedacao.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.temasRedacao.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new TemasRedacaoModel(data);
    }
}
