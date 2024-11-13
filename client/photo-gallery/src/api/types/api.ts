// src/api/types/api.ts
import { User, Role } from '@/types';

export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: Role; // Make role optional since it's set on the backend
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface UpdateRoleRequest {
    role: Role;
  }

export interface ApiError {
  message: string;
  status: number;
}