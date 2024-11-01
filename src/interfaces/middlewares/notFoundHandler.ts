import { Request, Response } from "express";

const notFoundErrorHandler = (req: Request, res: Response) => {
    res.status(404).json({
        message: "Funcionalidade em andamento.",
        requestedUrl: req.originalUrl,
    });
};

export default notFoundErrorHandler;
