export class Reply {
  constructor(message: string, code: string, status_code: number) {
    this.message = message;
    this.code = code;
    this.status_code = status_code;
  }

  readonly message: string;
  readonly code: string;
  readonly status_code: number;
}
