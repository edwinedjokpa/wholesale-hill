import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput, LoginUserResponse } from './dto/login-user.input';
import {
  CreateUserInput,
  CreateUserResponse,
} from 'src/user/dto/create-user.input';
import { UserType } from 'src/user/gql-type/user.type';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => CreateUserResponse)
  async register(@Args('input') input: CreateUserInput) {
    return await this.authService.register(input);
  }

  @Mutation(() => LoginUserResponse)
  async login(@Args('input') input: LoginUserInput) {
    return await this.authService.login(input);
  }
}
