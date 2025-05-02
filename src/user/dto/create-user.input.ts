import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserType } from '../gql-type/user.type';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

@ObjectType()
export class CreateUserResponse {
  @Field(() => String)
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => UserType)
  user: UserType;
}

@ObjectType()
export class UserDashboardResponse {
  @Field()
  message: string;

  @Field(() => UserResponse)
  data: UserResponse;
}
