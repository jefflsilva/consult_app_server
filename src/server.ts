import express from 'express';
import userRoutes from './interfaces/routes/user.routes'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes)

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Agendamentos de Consultas Online! Acesse /status para a mais detalhes da api.');
});
// app.get('/api-docs', (req, res) => {
//     res.sendFile(__dirname + '/path/to/your/documentation.html');
// });

app.get('/status', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        message: 'API está funcionando corretamente'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});