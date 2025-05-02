import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
