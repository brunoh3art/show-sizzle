import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Role } from './role';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name) {
    this.props.name = name;
  }
  public get name(): string {
    return this.props.name;
  }

  public set email(email) {
    this.props.email = email;
  }
  public get email(): string {
    return this.props.email;
  }

  public set password(password) {
    this.props.password = password;
  }
  public get password(): string {
    return this.props.password;
  }

  public set avatar(avatar) {
    this.props.avatar = avatar;
  }
  public get avatar(): string {
    return this.props.avatar;
  }

  public set role(role: Role) {
    this.props.role = role;
  }
  public get role(): Role {
    return this.props.role;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
