import { IsString, IsNumber } from 'class-validator';

export class SignupCustomerDto {
  @IsString()
  email: string;

  @IsNumber()
  password: string;
}
