import { Response } from "express";
import { AppError } from "../erros/AppError";

export class ErrorHandler {
    handle(err: any, res: Response) {
        if (err instanceof AppError) {
            return res.status(400).json({
                message: err.message,
            });
        }

        return res.status(err.status || 500).json({
            error: err.message || "Internal Server Error",
        });
    }
}