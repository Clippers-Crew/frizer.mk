import  instance   from './config/axios';
import { AuthResponse } from '../context/Context';
import { DecodedToken } from '../interfaces/DecodedToken.interface';

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
  }
}
