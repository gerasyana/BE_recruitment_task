import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { PrismaService } from 'src/prisma.service';
import { RoleService } from 'src/roles/role.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CustomerService, PrismaService, RoleService, CustomerResolver],
})
export class CustomerModule {}
