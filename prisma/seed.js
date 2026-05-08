import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando o seed do banco de dados com o novo schema...');

    // Opcional: Descomente para limpar o banco antes de popular
    // await prisma.usuario.deleteMany();
    // await prisma.livro.deleteMany();
    // await prisma.dica.deleteMany();
    // await prisma.temasRedacao.deleteMany();
    // await prisma.quiz.deleteMany();
    // await prisma.curiosidades.deleteMany();

    console.log('📦 Inserindo novos registros...');

    // 1. Usuário
    await prisma.usuario.create({
        data: {
            nome: 'João Silva',
            ativo: true,
            data: new Date('2023-10-15T00:00:00Z'),
        },
    });
    console.log('✅ Usuário inserido.');

    // 2. Livro
    await prisma.livro.create({
        data: {
            titulo: 'Dom Casmurro',
            titulo_en: 'Dom Casmurro',
            capa: 'https://www.pqn.com.br/portal/wp-content/uploads/2021/02/livro-dom-casmurro-de-machado-de-assis-og-300x158.jpg',
            autor: 'Machado de Assis',
            anoPublicacao: 1899,
            genero: 'Romance Realista',
            genero_en: 'Realist Novel',
            resumo: 'A história narra a vida de Bento Santiago, o Bentinho, e seu amor desde a infância por Capitu.',
            resumo_en:
                'The story narrates the life of Bento Santiago, or Bentinho, and his childhood love for Capitu.',
            contexto:
                'Final do Segundo Reinado no Brasil, transição para a República e abolição da escravatura.',
            contexto_en:
                'End of the Second Reign in Brazil, transition to the Republic and the abolition of slavery.',
            estiloEscrita:
                'Narrativa em primeira pessoa, marcada por ironia, digressões e pessimismo.',
            estiloEscrita_en:
                'First-person narrative, marked by irony, digressions, and pessimism.',
            enredo: 'Bentinho relata sua juventude, o romance com Capitu, seu casamento e a crescente desconfiança de que foi traído.',
            enredo_en:
                'Bentinho recounts his youth, his romance with Capitu, their marriage, and his growing suspicion of betrayal.',
            verossimilhanca:
                'A narrativa é construída sob a ótica de um narrador não-confiável, moldada por seus ciúmes.',
            verossimilhanca_en:
                'The narrative is built from the perspective of an unreliable narrator, shaped by his jealousy.',
            personagens: [
                'Bento Santiago (Bentinho)',
                'Capitu',
                'Ezequiel',
                'Escobar',
                'José Dias',
            ],
            caracteristicasLiterarias:
                'Análise psicológica profunda dos personagens, determinismo e crítica social.',
            caracteristicasLiterarias_en:
                'Deep psychological analysis of the characters, determinism, and social critique.',
            conclusao:
                'A obra termina com Bentinho solitário (Casmurro), deixando o leitor na dúvida eterna sobre o adultério de Capitu.',
            conclusao_en:
                "The work ends with Bentinho alone (Casmurro), leaving the reader in eternal doubt about Capitu's adultery.",
        },
    });
    console.log('✅ Livro inserido.');

    // 3. Dica
    await prisma.dica.create({
        data: {
            conteudo:
                'Preste atenção em como a narrativa é construída inteiramente sob o ponto de vista de Bentinho.',
            conteudo_en:
                "Pay attention to how the narrative is constructed entirely from Bentinho's point of view.",
            interpretacao: 'O ciúme pode distorcer a realidade e a memória do protagonista.',
            interpretacao_en: "Jealousy can distort the protagonist's reality and memory.",
            temasVestibular: 'Realismo, Narrador em Primeira Pessoa, Sociedade do Século XIX.',
            temasVestibular_en: 'Realism, First-Person Narrator, 19th Century Society.',
        },
    });
    console.log('✅ Dica inserida.');

    // 4. Tema de Redação
    await prisma.temasRedacao.create({
        data: {
            assunto: 'Os impactos do ciúme e da posse nas relações amorosas contemporâneas',
            assunto_en:
                'The impacts of jealousy and possession in contemporary romantic relationships',
            dificuldade: 4, // Como no seu schema está 'Int', mantemos como número
        },
    });
    console.log('✅ Tema de Redação inserido.');

    // 5. Quiz
    await prisma.quiz.create({
        data: {
            conteudoQuestao:
                'Quem era o melhor amigo de Bentinho no seminário e que mais tarde casou-se com Sancha?',
            conteudoQuestao_en:
                "Who was Bentinho's best friend in the seminary, who later married Sancha?",
            respostaQuestao: 'Escobar',
            respostaQuestao_en: 'Escobar',
        },
    });
    console.log('✅ Quiz inserido.');

    // 6. Curiosidades
    await prisma.curiosidades.create({
        data: {
            fatosLivro: 'Até hoje, a literatura brasileira debate se Capitu traiu ou não Bentinho.',
            fatosLivro_en:
                'To this day, Brazilian literature debates whether Capitu betrayed Bentinho or not.',
            autor: 'Machado de Assis foi o principal fundador e o primeiro presidente da Academia Brasileira de Letras.',
            autor_en:
                'Machado de Assis was the main founder and first president of the Brazilian Academy of Letters.',
            contexto: 'Faz parte da "Trilogia Realista" de Machado.',
            contexto_en: 'It is part of Machado\'s "Realist Trilogy".',
        },
    });
    console.log('✅ Curiosidade inserida.');

    console.log('✅ Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
