import express from "express";
import userRoutes from "./interfaces/routes/user.routes";
import errorHandler from "./interfaces/middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use('/api',userRoutes);
app.use(errorHandler);

export default app;
