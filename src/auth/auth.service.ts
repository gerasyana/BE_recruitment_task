import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ACTIVATION_CODE_INVALID,
  REFRESH_TOKEN_INVALID,
} from 'src/constants/errors';
import { CustomerService } from 'src/customer/customer.service';
import { Customer } from 'src/lib/entities/customer.entity';
import { verifyPassword } from './utils/verifyPassword';
import { secret, expiresIn } from './auth.settings';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.customerService.findOne({ email });
    if (!user) {
      return null;
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async login(user: Customer) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { secret }),
      refresh_token: this.jwtService.sign(payload, { secret, expiresIn }),
      activation_code: user.activationCode,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret });
      return {
        access_token: this.jwtService.sign(payload, { secret }),
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new Error(REFRESH_TOKEN_INVALID);
    }
  }

  async verify(activationCode: string) {
    const user = await this.customerService.findOne({ activationCode });

    if (!user) {
      throw new HttpException(ACTIVATION_CODE_INVALID, HttpStatus.FORBIDDEN);
    }
    await this.customerService.update(user.id, {
      isActivated: true,
      activationCode: null,
    });
  }
}
