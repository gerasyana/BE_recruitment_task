import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { secret } from 'src/auth/auth.settings';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, { secret });
      req.user = payload;
      next();
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
