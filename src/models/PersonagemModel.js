import prisma from '../lib/services/prismaClient.js';

export default class PersonagemModel {
    constructor({
        id = null,
        created_at = null,
        descricao,
        personagem,
    } = {}) {
        this.id = id;
        this.created_at = created_at;
        this.descricao = descricao;
        this.personagem = personagem;
    }

    async criar() {
        return prisma.personagem.create({
            data: {
                descricao: this.descricao,
                personagem: this.personagem,
            },
        });
    }

    async atualizar() {
        return prisma.personagem.update({
            where: { id: BigInt(this.id) },
            data: {
                descricao: this.descricao,
                personagem: this.personagem,
            },
        });
    }

    async deletar() {
        return prisma.personagem.delete({ where: { id: BigInt(this.id) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.personagem) {
            where.personagem = { contains: filtros.personagem, mode: 'insensitive' };
        }
        if (filtros.descricao) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }

        return prisma.personagem.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.personagem.findUnique({ where: { id: BigInt(id) } });
        if (!data) {
            return null;
        }
        return new PersonagemModel(data);
    }
}