import { HttpException, HttpStatus } from '@nestjs/common';

export class UserCredentialsInvalidException extends HttpException {
  constructor() {
    super('Username or password invalid.', HttpStatus.UNAUTHORIZED);
  }
}
