import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { INVALID_USER_CREDENTIALS } from 'src/constants/errors';
import { SignupCustomerDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
  ) {}

  @Post('signup')
  async signup(@Body() data: SignupCustomerDto): Promise<any> {
    const user = await this.customerService.create(data);
    return this.authService.login(user);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    const user = await this.authService.validateUser(data.email, data.password);

    if (!user) {
      throw new HttpException(
        INVALID_USER_CREDENTIALS,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() data: { refresh_token: string }) {
    return this.authService.refresh(data.refresh_token);
  }

  @Post('verify')
  @HttpCode(200)
  async verify(@Body() body: { activationCode: string }) {
    const { activationCode } = body;

    return this.authService.verify(activationCode);
  }
}
