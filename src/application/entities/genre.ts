import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface GenreProps {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
export class Genre {
  private _id: string;
  private props: GenreProps;

  constructor(props: Replace<GenreProps, { createdAt?: Date; updatedAt?: Date }>, id?: string) {
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

  public get title(): string {
    return this.props.title;
  }
  public set title(title: string) {
    this.props.title = title;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
