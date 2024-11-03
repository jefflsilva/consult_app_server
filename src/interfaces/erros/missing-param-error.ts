import { AppError } from './AppError';

export class MissingParamError extends AppError {
  constructor(paramName: string) {
    super(`Missing param: '${paramName}'.`,);
    this.name = 'MissingParamError'
  }
}