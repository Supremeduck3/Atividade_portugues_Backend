import express from 'express';
import 'dotenv/config';
import curiosidadesRoutes from './routes/curiosidadesRoute.js';
import dicaRoutes from './routes/dicaRoute.js';
import livroRoutes from './routes/livroRoute.js';
import quizsRoutes from './routes/quizRoute.js';
import temasRedacaoRoutes from './routes/temasRedacaoRoute.js';
import usuarioRoutes from './routes/usuarioRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/exemplos', curiosidadesRoutes);
app.use('/api/exemplos', dicaRoutes);
app.use('/api/exemplos', livroRoutes);
app.use('/api/exemplos', quizsRoutes);
app.use('/api/temasRedacao', temasRedacaoRoutes);
app.use('/api/usuario', usuarioRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
