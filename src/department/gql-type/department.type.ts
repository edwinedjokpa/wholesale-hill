import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SubDepartmentType } from './sub-department.type';

@ObjectType('Department')
export class DepartmentType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [SubDepartmentType], { nullable: true })
  subDepartments?: SubDepartmentType[];
}
