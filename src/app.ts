import express from "express";
import userRoutes from "./interfaces/routes/user.routes";
import errorHandler from "./interfaces/middlewares/errorHandler";
import notFoundErrorHandler from './interfaces/middlewares/notFoundHandler';

const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
    const apiInfo = {
        name: "API de Gestão de Profissionais e Pacientes",
        version: "1.0.0",
        description: "Esta é uma API em desenvolvimento para a gestão de profissionais e pacientes. Funcionalidades em andamento.",
        endpoints: [
            { method: "GET", path: "/api", description: "Apresentação da API." },
            { method: "GET", path: "/api/users", description: "Lista todos os usuários (profissionais e pacientes)." },
            { method: "POST", path: "/api/users", description: "Cria um novo usuário (profissional ou paciente)." },
        ],
    };

    res.json(apiInfo);
});

app.use('/api', userRoutes);

app.use(notFoundErrorHandler);

app.use(errorHandler);

export default app;
