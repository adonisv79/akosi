import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * This middleware attaches a logger in the request which uses a unique request trace id
 * to ease debuging later.
 * @param req
 * @param _res
 * @param next
 */
export function LoggerMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  req.logger = new Logger(`UnknownClient(${req.ip})`, { timestamp: true });
  req.logger.log(`${req.method} ${req.originalUrl}`);
  next();
}
