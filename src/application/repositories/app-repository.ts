export abstract class AppRepository {
  abstract browse(): any;
  abstract browseByGenre(title: string, page: number, pageSize: number): any;
}
