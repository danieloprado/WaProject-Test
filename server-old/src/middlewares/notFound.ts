import { NextFunction, Request, Response } from 'express';

export default function notFound(req: Request, res: Response, next: NextFunction): Response {
  return res.status(404).json('Nenhum rota encontrada');
}