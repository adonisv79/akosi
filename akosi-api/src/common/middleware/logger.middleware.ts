import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: CustomRequest, _res: Response, next: NextFunction) {
    req.logger = new Logger(`UnknownClient(${req.ip})`, { timestamp: true });
    req.logger.log(`${req.method} ${req.baseUrl}${req.path}`)
    next();
  }
}

export interface CustomRequest extends Request {
  logger: Logger;
}