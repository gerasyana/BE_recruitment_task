import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerService } from 'src/customer/customer.service';
import { PrismaService } from 'src/prisma.service';
import { RoleService } from 'src/roles/role.service';
import { expiresIn, secret } from './auth.settings';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn },
    }),
  ],
  providers: [PrismaService, AuthService, RoleService, CustomerService],
  controllers: [AuthController],
})
export class AuthModule {}
