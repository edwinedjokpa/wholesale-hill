import { Context, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt.guard';
import { UserDashboardResponse } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => UserDashboardResponse)
  async dashboard(@Context() context) {
    return await this.userService.dashboard(context.req.user.id);
  }
}
