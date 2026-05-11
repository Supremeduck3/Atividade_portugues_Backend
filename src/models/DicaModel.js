import prisma from '../lib/services/prismaClient.js';

export default class DicaModel {
    constructor({
        id = null,
        conteudo,
        conteudo_en,
        interpretacao = true,
        interpretacao_en,
        temasVestibular,
        temasVestibular_en = null,
    } = {}) {
        this.id = id;
        this.conteudo = conteudo;
        this.conteudo_en = conteudo_en;
        this.interpretacao = interpretacao;
        this.interpretacao_en = interpretacao_en;
        this.temasVestibular = temasVestibular;
        this.temasVestibular_en = temasVestibular_en;
    }

    async criar() {
        return prisma.dica.create({
            data: {
                conteudo: this.conteudo,
                conteudo_en: this.conteudo_en,
                interpretacao: this.interpretacao,
                interpretacao_en: this.interpretacao_en,
                temasVestibular: this.temasVestibular,
                temasVestibular_en: this.temasVestibular_en,
            },
        });
    }

    async atualizar() {
        return prisma.dica.update({
            where: { id: parseInt(this.id) },
            data: {
                conteudo: String(this.conteudo),
                conteudo_en: String(this.conteudo_en),
                interpretacao: this.interpretacao, 
                interpretacao_en: String(this.interpretacao_en),
                temasVestibular: String(this.temasVestibular),
                temasVestibular_en: String(this.temasVestibular_en),
            },
        });
    }

    static async buscarPorId(id) {
        if (!id) return null;
        const data = await prisma.dica.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) return null;
        return new DicaModel(data);
    }

    async deletar() {
        return prisma.dica.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.conteudo) {
            where.conteudo = { contains: filtros.conteudo, mode: 'insensitive' };
        }
        if (filtros.conteudo_en) {
            where.conteudo_en = { contains: filtros.conteudo_en, mode: 'insensitive' };
        }
        if (filtros.interpretacao !== undefined) {
            where.interpretacao = filtros.interpretacao === 'true';
        }
        if (filtros.interpretacao_en !== undefined) {
            where.interpretacao_en = filtros.interpretacao_en === 'true';
        }
        if (filtros.temasVestibular !== undefined) {
            where.temasVestibular = parseFloat(filtros.temasVestibular);
        }
        if (filtros.temasVestibular_en !== undefined) {
            where.temasVestibular_en = parseFloat(filtros.temasVestibular_en);
        }

        return prisma.dica.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.dica.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new DicaModel(data);
    }
}
