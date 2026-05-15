import express from 'express';
import 'dotenv/config';
import { apiKey } from './lib/middleware/apiKey.js';

import arquivoRoutes from './routes/arquivosRoutes.js';
import quizRoutes from './routes/quizRoute.js';
import dicaRoutes from './routes/dicaRoute.js';
import temasRedacaoRoutes from './routes/temasRedacaoRoute.js';
import curiosidadesRoute from './routes/curiosidadesRoute.js'
import usuarioRoutes from './routes/usuarioRoute.js';
import livroRoutes from './routes/livroRoute.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});


// Rotas

app.use('/api/curiosidades', apiKey, curiosidadesRoute);
app.use('/api/dica',apiKey, dicaRoutes);
app.use('/api/livro',apiKey, livroRoutes);
app.use('/api/quiz',apiKey, quizRoutes);
app.use('/api/temasRedacao',apiKey, temasRedacaoRoutes);
app.use('/api/usuario',apiKey, usuarioRoutes);


app.use('/api/fotos', apiKey, arquivoRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
