// src/middleware/roleCheck.ts
import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const checkRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role as Role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};