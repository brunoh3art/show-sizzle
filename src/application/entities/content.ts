import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface ContentProps {
  title: Title;
  original_title: Title;
  overview?: string;
  release_date: string;
  poster_image?: string;
  background_image?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Content {
  // props class properties for movies and series
  private _id: string;
  private props: ContentProps;

  constructor(props: Replace<ContentProps, { createdAt?: Date; updatedAt?: Date }>, id?: string) {
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

  public set title(title: Title) {
    this.props.title = title;
  }
  public get title(): Title {
    return this.props.title;
  }

  public set original_title(original_title: Title) {
    this.props.original_title = original_title;
  }
  public get original_title(): Title {
    return this.props.original_title;
  }

  public set overview(overview: string) {
    this.props.overview = overview;
  }
  public get overview(): string {
    return this.props.overview;
  }

  public set release_date(release_date: string) {
    this.props.release_date = release_date;
  }
  public get release_date(): string {
    return this.props.release_date;
  }

  public set poster_image(poster_image: string) {
    this.props.poster_image = poster_image;
  }
  public get poster_image(): string {
    return this.props.poster_image;
  }

  public set background_image(background_image: string) {
    this.props.background_image = background_image;
  }
  public get background_image(): string {
    return this.props.background_image;
  }

  public set published(published: boolean) {
    this.props.published = published;
  }
  public get published(): boolean {
    return this.props.published;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export class Title {
  private readonly title: string;

  get value(): string {
    return this.title;
  }

  private validateTitleLength(value: string): boolean {
    return value.length >= 3 && value.length <= 240;
  }

  constructor(value: string) {
    const isTitleLengthValid = this.validateTitleLength(value);

    if (!isTitleLengthValid) throw new Error(`title length error.`);

    this.title = value;
  }
}
