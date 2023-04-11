import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Role } from './role';

export interface PermissionProps {
  name: string;
  roles: Role[];
}

export class Permission {
  private _id: string;
  private props: PermissionProps;

  constructor(props: Replace<PermissionProps, { roles?: Role[] }>, id: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      roles: this.props.roles || [],
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

  public get roles(): Role[] {
    return this.props.roles;
  }
}
