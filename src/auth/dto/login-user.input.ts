import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
export class AuthData {
  @Field()
  accessToken: string;
}

@ObjectType()
export class LoginUserResponse {
  @Field()
  message: string;

  @Field(() => AuthData)
  data: AuthData;
}
