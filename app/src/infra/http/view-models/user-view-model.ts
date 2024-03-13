import { User } from '@application/entities/user';
import { ControlAccessModel } from './control-access-model';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: ControlAccessModel.toRoleHTTP(user.role),
    };
  }
}
