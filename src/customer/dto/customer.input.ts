import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Role } from 'src/roles/role.enums';

@InputType()
export class WhereCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  activationCode?: string;

  @Field(() => Boolean, { nullable: true })
  isActivated?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class GetCustomerInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class GetOneCustomerInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => String)
  email?: string;

  @Field(() => String)
  password?: string;

  @Field(() => String, { nullable: true })
  activationCode?: string;

  @Field(() => Boolean, { nullable: true })
  isActivated?: boolean;
}

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Role, { defaultValue: Role.User })
  role?: Role;
}
