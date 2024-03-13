import { User } from '@application/entities/user';

export interface UserResponse {
  total: number;
  user: User[];
}

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findMany(skip: number, take: number): Promise<UserResponse>;
  abstract create(user: User): Promise<void>;
  abstract save(userId: string, content: User): Promise<void>;
  abstract remove(user: string): Promise<void>;
}
