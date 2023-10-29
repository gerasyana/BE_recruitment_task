import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';
import { Role as RoleType } from 'src/roles/role.enums';

@ObjectType()
export class Role extends Base {
  @Field(() => RoleType)
  name: Role;
}
