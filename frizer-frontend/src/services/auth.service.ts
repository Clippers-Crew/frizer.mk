import  instance   from './config/axios';
import { AuthResponse } from '../context/Context';
import { DecodedToken } from '../interfaces/DecodedToken.interface';
import { BaseUserCreate } from '../interfaces/BaseUserCreate.interface';

const AuthService =  {
   async authenticate(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await instance.post(`/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  },
  
  async register(userCreate: BaseUserCreate) {
    try {
      const response = await instance.post('/auth/register', userCreate);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }
}
export default AuthService; 
