import * as jwt from 'jsonwebtoken';
import { APP_AUTH_SECRET, APP_SECRET } from './config';

type Payload = Record<string, any>;

export class Jwt {
  static async createToken(payload: Payload, options?: jwt.SignOptions): Promise<string> {
    try {
      const token = jwt.sign(payload, APP_SECRET, {
        issuer: '@app/api',
        audience: ['@app/app', '@app/web'],
        expiresIn: '4w',
        ...options,
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createAuthToken(payload: Payload) {
    try {
      const token = jwt.sign(payload, APP_AUTH_SECRET, {
        issuer: '@app/api',
        audience: ['@app/app', '@prisma/web'],
        expiresIn: '4w',
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async decryptToken<T>(token: string): Promise<T> {
    try {
      jwt.verify(token, APP_SECRET);
      const payload = jwt.decode(token);
      return payload as T;
    } catch (error) {
      // Oops
      throw error;
    }
  }
}
