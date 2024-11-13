// src/api/services/auth.ts
import api from '../config/axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/api';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: Omit<RegisterRequest, 'confirmPassword'>): Promise<AuthResponse> => {
    // Role will be set by the backend
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  validateToken: async (): Promise<{ user: AuthResponse['user'] }> => {
    const response = await api.get<{ user: AuthResponse['user'] }>('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};