import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameInUseException extends HttpException {
  constructor(username: string) {
    super(`User ${username} is already in use`, HttpStatus.CONFLICT);
  }
}
