import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('SubDepartment')
export class SubDepartmentType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
