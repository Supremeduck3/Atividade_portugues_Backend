import prisma from '../lib/services/prismaClient.js';

export default class ImagemModel {
    constructor({
        id = null,
        foto,
        descricao = null
    } = {}) {
        this.id = id;
        this.foto = foto;
        this.descricao = descricao
    }

    async criar() {
        return prisma.imagens.create({
            data: {
                descricao: this.descricao,
                foto: this.foto
            },
        });
    }

    async atualizar() {
        return prisma.imagens.update({
            where: { id: parseInt(this.id) },
            data: {
                descricao: this.descricao,
                foto: this.foto,
            },
        });
    }

    static async buscarPorId(id) {
        if (!id) return null;
        const data = await prisma.imagens.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) return null;
        return new ImagemModel(data);
    }

    async deletar() {
        return prisma.imagens.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.conteudo) {
            where.conteudo = { contains: filtros.conteudo, mode: 'insensitive' };
        }
        if (filtros.conteudo_en) {
            where.conteudo_en = { contains: filtros.conteudo_en, mode: 'insensitive' };
        }

        return prisma.imagens.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.imagens.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ImagemModel(data);
    }
}
