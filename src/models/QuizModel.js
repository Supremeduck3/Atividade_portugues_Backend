import prisma from '../lib/services/prismaClient.js';

export default class QuizModel {
    constructor({
        id = null,
        conteudoQuestao,
        conteudoQuestao_en,
        respostaQuestao,
        respostaQuestao_en,

    } = {}) {
        this.id = id;
        this.conteudoQuestao = conteudoQuestao;
        this.conteudoQuestao_en = conteudoQuestao_en;
        this.respostaQuestao = respostaQuestao;
        this.respostaQuestao_en = respostaQuestao_en;
    }

    async criar() {
        return prisma.quiz.create({
            data: {
                conteudoQuestao: this.conteudoQuestao,
                conteudoQuestao_en: this.conteudoQuestao_en,
                respostaQuestao: this.respostaQuestao,
                respostaQuestao_en: this.respostaQuestao_en,
            },
        });
    }

    async atualizar() {
        return prisma.quiz.update({
            where: { id: this.id },
            data: {
                conteudoQuestao: this.conteudoQuestao,
                conteudoQuestao_en: this.conteudoQuestao_en,
                respostaQuestao: this.respostaQuestao,
                respostaQuestao_en: this.respostaQuestao_en,
            },
        });
    }

    async deletar() {
        return prisma.quiz.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.conteudoQuestao) {
            where.conteudoQuestao = { contains: filtros.conteudoQuestao, mode: 'insensitive' };
        }
        if (filtros.conteudoQuestao_en) {
            where.conteudoQuestao_en = { contains: filtros.conteudoQuestao_en, mode: 'insensitive' };
        }
        if (filtros.respostaQuestao !== undefined) {
            where.respostaQuestao = filtros.respostaQuestao === 'true';
        }
        if (filtros.respostaQuestao_en !== undefined) {
            where.respostaQuestao_en = filtros.respostaQuestao_en === 'true';
        }

        return prisma.quiz.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.quiz.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new QuizModel(data);
    }
}
