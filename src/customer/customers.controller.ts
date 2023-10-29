import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { GetCustomerInput } from './dto/customer.input';
import { UpdateCustomerDto } from './dto/customer.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.quard';

@Controller('customers')
@UseGuards(RolesGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(@Query('email') email: string, @Query('id') id: string) {
    const params = {
      where: { email, id },
    } as GetCustomerInput;

    return this.customerService.findAll(params);
  }

  @Get()
  async find(@Query('id') id: string) {
    return this.customerService.findOne({ id });
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
