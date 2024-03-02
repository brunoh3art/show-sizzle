export class Erros extends Error {
  statusCode: number;
  status: number;

  constructor(code: number, message: string) {
    super(message);
    this.statusCode = code;
    this.status = code;
  }
}
