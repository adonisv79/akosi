import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameInUseException extends HttpException {
  constructor() {
    super(`Username is already in use`, HttpStatus.CONFLICT);
  }
}
