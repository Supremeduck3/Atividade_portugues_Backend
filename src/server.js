import express from 'express';
import 'dotenv/config';
import curiosidadesRoutes from './routes/curiosidadesRoute.js';
import dicaRoutes from './routes/dicaRoute.js'


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});


// Rotas
app.use('/api/curiosidades', curiosidadesRoutes);
app.use('/api/dica', dicaRoutes)


app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
