import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DepartmentType } from '../gql-type/department.type';

@ObjectType()
export class DepartmentResponse {
  @Field(() => DepartmentType)
  department: DepartmentType;
}

@ObjectType()
export class CreateDepartmentResponse {
  @Field()
  message: string;

  @Field(() => DepartmentResponse)
  data: DepartmentResponse;
}

@ObjectType()
export class GetAllDepartmentsData {
  @Field(() => [DepartmentType])
  departments: DepartmentType[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class GetAllDepartmentsResponse {
  @Field()
  message: string;

  @Field(() => GetAllDepartmentsData)
  data: GetAllDepartmentsData;
}

@ObjectType()
export class UpdateDepartmentResponse {
  @Field()
  message: string;

  @Field(() => DepartmentResponse)
  data: DepartmentResponse;
}

@ObjectType()
export class DeleteDepartmentResponse {
  @Field()
  message: string;
}
