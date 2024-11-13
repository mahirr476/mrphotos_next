// server/src/services/authService.ts
import { PrismaClient, User, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';

const prisma = new PrismaClient();

interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}

export class AuthService {
  async register(data: RegisterData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    const token = this.generateToken(user);

    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = this.generateToken(user);

    return { user: userWithoutPassword, token };
  }

  private generateToken(user: User): string {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
      { 
        userId: user.id, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}