import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomerInput,
  GetCustomerInput,
  UpdateCustomerInput,
  WhereCustomerInput,
} from './dto/customer.input';
import { generateActivationCode, hashPassword } from 'src/auth/utils';
import { RoleService } from 'src/roles/role.service';
import { Customer } from 'src/lib/entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private roleService: RoleService,
  ) {}
  async findAll(data: GetCustomerInput) {
    const { skip, take, cursor, where } = data;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      include: {
        role: true,
      },
    });
  }

  async findOne(data: WhereCustomerInput) {
    return this.prisma.customer.findFirst({
      where: data,
    });
  }

  async delete(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  async update(id: string, { password, ...userData }: UpdateCustomerInput) {
    const hashedPassword = password ? await hashPassword(password) : null;

    return this.prisma.customer.update({
      where: { id },
      data: {
        ...userData,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
  }

  async create({ role, password, ...userData }: CreateCustomerInput) {
    const userRole = await this.roleService.findByName(role);
    const hashedPassword = await hashPassword(password);

    return this.prisma.customer.create({
      data: {
        ...userData,
        activationCode: generateActivationCode(),
        roleId: userRole.id,
        password: hashedPassword,
      },
    });
  }
}
