import { IsNumber, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/roles/role.enums';

export class UpdateCustomerDto {
  @IsNumber()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role?: Role;
}
