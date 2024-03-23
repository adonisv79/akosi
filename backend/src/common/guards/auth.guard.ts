import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { Configuration } from 'src/config/configuration';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private config: ConfigService<Configuration>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('api', { infer: true }).jwt.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = { id: payload.sub, username: payload.username };
      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError)
        console.error(`Token expired ar ${err.expiredAt}`);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; username: string };
    }
  }
}
