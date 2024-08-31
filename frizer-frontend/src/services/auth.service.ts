import  instance   from './config/axios';
import { AuthResponse } from '../context/Context';

export class AuthService {
  static async authenticate(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await instance.post(`/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };
  
  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }): Promise<string> {
    try {
      const response = await instance.post(`/auth/register`, {
        userData
      });
      return response.data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }
}
