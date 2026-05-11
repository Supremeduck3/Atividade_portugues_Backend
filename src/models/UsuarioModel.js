import prisma from '../lib/services/prismaClient.js';

export default class UsuarioModel {
    constructor({ id = null, nome, ativo = true } = {}) {
        this.id = id;
        this.nome = nome;
        this.ativo = ativo;
    }

    async criar() {
        return prisma.usuario.create({
            data: {
                nome: this.nome,
                ativo: this.ativo,
                data: new Date(),
            },
        });
    }

    async atualizar() {
        return prisma.usuario.update({
            where: { id: this.id },
            data: { nome: this.nome, ativo: this.ativo },
        });
    }

    async deletar() {
        return prisma.usuario.delete({
            where: {
                id: Number(this.id), // Força a conversão para número aqui também
            },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.ativo !== undefined) {
            where.ativo = filtros.ativo === 'true';
        }

        return prisma.usuario.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.usuario.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new UsuarioModel(data);
    }
}
