import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  USER_NOT_FOUND,
  USER_NOT_ACTIVATED,
  INTERNAL_SERVER_ERROR,
} from 'src/constants/errors';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class UserValidationMiddleware implements NestMiddleware {
  constructor(private readonly customerService: CustomerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    try {
      const userId = (req.user as { sub: string; iat: string }).sub;
      const userData = await this.customerService.findOne({ id: userId });

      if (!userData) {
        throw new Error(USER_NOT_FOUND);
      }
      if (!userData.isActivated) {
        throw new Error(USER_NOT_ACTIVATED);
      }
      req.user = {
        ...req.user,
        data: userData,
      };
      next();
    } catch (error) {
      throw new HttpException(
        error.message || INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
