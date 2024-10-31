import { Request, Response } from "express";

const errorHandler = (err: any, _: Request, res: Response) => {
    console.error(err);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
};

export default errorHandler;
