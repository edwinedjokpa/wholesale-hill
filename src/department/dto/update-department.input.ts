import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  @MinLength(2)
  name: string;
}
