import { ServerError } from "../erros/serverError";
import { HttpResponse } from "../../interfaces/protocols/http";

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error.message,
});

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error.stack || ""),
});

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data,
});

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: null,
});
