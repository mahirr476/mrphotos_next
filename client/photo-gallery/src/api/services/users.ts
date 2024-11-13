// src/api/services/users.ts
import api from '../config/axios';
import { User, Role } from '@/types';
import { UpdateRoleRequest } from '../types/api';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  updateUserRole: async (userId: string, role: Role): Promise<User> => {
    const response = await api.patch<User>(
      `/users/${userId}/role`,
      { role } as UpdateRoleRequest
    );
    return response.data;
  },
};