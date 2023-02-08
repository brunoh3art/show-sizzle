import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface SeasonProps {
  title: SeasonTitle;
  season_number: SeasonNumber;
  season_overview?: string;
  poster_image?: string;
  release_date?: string;
  //boolean verifies that the publication
  isPublished?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Season {
  private _id: string;
  private props: SeasonProps;

  constructor(props: Replace<SeasonProps, { createdAt?: Date; updatedAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  public get id(): string {
    return this._id;
  }
  public set title(title: SeasonTitle) {
    this.props.title = title;
  }
  public get title(): SeasonTitle {
    return this.props.title;
  }

  public set season_number(season_number: SeasonNumber) {
    this.props.season_number = season_number;
  }
  public get season_number(): SeasonNumber {
    return this.props.season_number;
  }

  public set season_overview(season_overview: string) {
    this.props.season_overview = season_overview;
  }
  public get season_overview(): string {
    return this.props.season_overview;
  }

  public set poster_image(poster_image: string) {
    this.props.poster_image = poster_image;
  }
  public get poster_image(): string {
    return this.props.poster_image;
  }

  public set isPublished(isPublished: boolean) {
    this.props.isPublished = isPublished;
  }
  public get isPublished(): boolean {
    return this.props.isPublished;
  }

  public set release_date(release_date: string) {
    this.props.release_date = release_date;
  }
  public get release_date(): string {
    return this.props.release_date;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export class SeasonNumber {
  private readonly number: number;

  get value(): number {
    return this.number;
  }

  private validateSeasonNumber(value: number): boolean {
    return value > 0;
  }

  constructor(value: number) {
    const isNumberLengthValid = this.validateSeasonNumber(value);

    if (!isNumberLengthValid) throw new Error(`Season number must be greater than e 0.`);

    this.number = value;
  }
}

export class SeasonTitle {
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
