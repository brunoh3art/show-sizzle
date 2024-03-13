export abstract class AppRepository {
  abstract browse(): any;
  abstract browseByGenre(title: string, skip: number, take: number): any;
}
