import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Permission } from './permission';

export interface RoleProps {
  name: string;
  permissions: Permission[];
}

export class Role {
  private _id: string;
  private props: RoleProps;

  constructor(props: Replace<RoleProps, { permissions?: Permission[] }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      permissions: props.permissions ?? [],
    };
  }

  public get id() {
    return this._id;
  }
  public set name(name: string) {
    this.props.name = name;
  }
  public get name() {
    return this.props.name;
  }
}
