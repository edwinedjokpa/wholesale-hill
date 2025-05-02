import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, MinLength, IsOptional } from 'class-validator';
import { CreateSubDepartmentInput } from './create-sub-department.input';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @IsArray()
  @IsOptional()
  subDepartments?: CreateSubDepartmentInput[];
}
