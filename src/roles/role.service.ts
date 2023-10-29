import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Role } from './role.enums';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findByName(name: Role) {
    return this.prisma.role.findFirst({
      where: { name },
    });
  }
}
