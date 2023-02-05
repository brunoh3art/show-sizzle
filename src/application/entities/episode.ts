import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Season } from './season';

export interface EpisodeProps {
  title: EpisodeTitle;
  episode_number: EpisodeNumber;
  overview?: string;
  background_image?: string;
  release_date?: string;
  season?: Season;
  //boolean verifies that the publication
  isPublished?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Episode {
  private _id: string;
  private props: EpisodeProps;

  constructor(props: Replace<EpisodeProps, { createdAt?: Date; updatedAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  public get id(): string {
    return this.id;
  }
  public set title(title: EpisodeTitle) {
    this.props.title = title;
  }
  public get title(): EpisodeTitle {
    return this.props.title;
  }

  public set episode_number(number: EpisodeNumber) {
    this.props.episode_number = number;
  }
  public get episode_number(): EpisodeNumber {
    return this.props.episode_number;
  }

  public get season(): Season {
    return this.props.season;
  }

  public set overview(overview: string) {
    this.props.overview = overview;
  }
  public get overview(): string {
    return this.props.overview;
  }

  public set background_image(background_image: string) {
    this.props.background_image = background_image;
  }
  public get background_image(): string {
    return this.props.background_image;
  }

  public set isPublished(isPublished: boolean) {
    this.props.isPublished = isPublished;
  }
  public get isPublished(): boolean {
    return this.props.isPublished;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export class EpisodeNumber {
  private readonly number: number;

  get value(): number {
    return this.number;
  }

  private validateEpisodeNumber(value: number): boolean {
    return value > 0;
  }

  constructor(value: number) {
    const isNumberLengthValid = this.validateEpisodeNumber(value);

    if (!isNumberLengthValid) throw new Error(`Episode number must be greater than e 0.`);

    this.number = value;
  }
}

export class EpisodeTitle {
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
