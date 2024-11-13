// server/src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();
const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        role: Role.USER, // Use enum value
      });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUserRole(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      const { user } = req as any;

      if (user.role !== Role.ADMIN) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role },
      });

      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const { user } = req as any;

      if (user.role !== Role.ADMIN) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      });

      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}