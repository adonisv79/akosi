import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { CustomRequest } from 'src/common/middleware/logger.middleware';

const LOGGER_CONTEXT = 'ErrorHandlerService';

@Injectable()
export class ErrorHandlerService {
  constructor(@Inject(REQUEST) private readonly req: CustomRequest) {}

  /**
   * Handles any known service related errors and throws a proper nestjs response.
   * @param error the error object from a catch
   */
  handlePrismaConnectivityErrors(error: unknown, context?: string) {
    if (error instanceof HttpException) return;

    if (error['name'])
      this.req.logger.error(
        `PRISMA_ERROR: ${error['name']}`,
        null,
        LOGGER_CONTEXT,
      );
    // handle database connectivity errors
    if (error instanceof PrismaClientInitializationError) {
      this.req.logger.error(
        error.message,
        error.stack,
        context ?? LOGGER_CONTEXT,
      );
      throw new ServiceUnavailableException();
    } else if (error instanceof PrismaClientKnownRequestError) {
      this.req.logger.error(
        `[${error.code}] ${error.message}`,
        error.stack,
        context ?? LOGGER_CONTEXT,
      );
      switch (error.code) {
        case '1001':
          throw new ServiceUnavailableException();
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  handleGeneralError<T extends HttpException>(
    error: unknown,
    context?: string,
  ) {
    if (error instanceof HttpException) return;

    if (error instanceof Error)
      this.req.logger.error(
        error.message,
        error.stack,
        context ?? LOGGER_CONTEXT,
      );
  }
}
