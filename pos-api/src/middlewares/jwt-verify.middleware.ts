import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.util';
import { verifyToken } from '../utils/jwt.util';

export function jwtVerify(secretKey: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req?.cookies;

    if (!token) throw AppError('Token must be provided', 401);

    const payload = verifyToken(token, secretKey);

    res.locals.payload = payload; 

    next();
  };
}
