import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.util';

export function roleVerify(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.payload;

    if (!allowedRoles?.includes(role))
      throw AppError('Unauthorize access for this user role', 401);

    next();
  };
}
