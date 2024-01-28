import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

const LOGGER_CONTEXT = 'HttpExceptionFilter';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = error.getStatus();
    this.handlePrismaConnectivityErrors(request, error);
    this.handleGeneralError(request, error);
    response.status(status).json({ statusCode: status, name: error.name || 'unknown' })
  }
  /**
   * Handles any known service related errors and throws a proper nestjs response.
   * @param error the error object from a catch
   */
  private handlePrismaConnectivityErrors(request: Request, error: unknown) {
    if (error instanceof HttpException) return;

    if (error['name'])
      request.logger.error(
        `PRISMA_ERROR: ${error['name']}`,
        null,
        LOGGER_CONTEXT,
      );
    // handle database connectivity errors
    if (error instanceof PrismaClientInitializationError) {
      request.logger.error(error.message, error.stack, LOGGER_CONTEXT);
      throw new ServiceUnavailableException();
    } else if (error instanceof PrismaClientKnownRequestError) {
      request.logger.error(
        `[${error.code}] ${error.message}`,
        error.stack,
        LOGGER_CONTEXT,
      );
      switch (error.code) {
        case '1001':
          throw new ServiceUnavailableException();
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  private handleGeneralError(
    request: Request,
    error: unknown,
  ) {
    if (error instanceof HttpException) return;

    if (error instanceof Error)
      request.logger.error(error.message, error.stack, LOGGER_CONTEXT);
  }
}
