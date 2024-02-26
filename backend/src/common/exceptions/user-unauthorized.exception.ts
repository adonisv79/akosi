import { HttpException, HttpStatus } from '@nestjs/common';

export class UserUnauthorizedException extends HttpException {
  constructor(userId: string | null) {
    super(
      userId
        ? `User ${userId}`
        : 'Unknown user' +
            ' is unauthorized and blocked from accessing the resource',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
