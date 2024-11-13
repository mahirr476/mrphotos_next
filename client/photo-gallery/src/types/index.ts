// src/types/index.ts
export type Role = 'USER' | 'ADMIN';

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
  }

export interface AuthResponse {
  user: User;
  token: string;
}