import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface VideoProps {
  id: string;
  title: string;
  type: string;
  link: string;
  format: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Video {
  private _id: string;
  private props: VideoProps;

  constructor(props: Replace<VideoProps, { createdAt?: Date; updatedAt?: Date }>, id?: string) {
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

  public set title(value: string) {
    this.props.type = value;
  }
  public get title(): string {
    return this.props.type;
  }

  public set type(value: string) {
    this.props.type = value;
  }
  public get type(): string {
    return this.props.type;
  }

  public set link(value: string) {
    this.props.link = value;
  }
  public get link(): string {
    return this.props.link;
  }

  public set format(value: string) {
    this.props.format = value;
  }
  public get format(): string {
    return this.props.format;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
