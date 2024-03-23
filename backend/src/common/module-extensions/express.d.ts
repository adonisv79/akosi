import { Logger } from '@nestjs/common';

declare module 'express' {
  interface Request {
    user?: { id: string; username: string };
    logger: Logger;
  }
}
