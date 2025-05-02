import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { DepartmentType } from './gql-type/department.type';
import {
  CreateDepartmentResponse,
  DeleteDepartmentResponse,
  GetAllDepartmentsResponse,
  UpdateDepartmentResponse,
} from './dto/department-response';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => DepartmentType)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => CreateDepartmentResponse)
  async createDepartment(@Args('input') input: CreateDepartmentInput) {
    return this.departmentService.create(input);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => GetAllDepartmentsResponse)
  async getAllDepartments(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('offset', { type: () => Int, nullable: true }) offset: number,
  ) {
    return this.departmentService.findAll(limit, offset);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => UpdateDepartmentResponse)
  async updateDepartment(@Args('input') input: UpdateDepartmentInput) {
    return this.departmentService.update(input);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteDepartmentResponse)
  async deleteDepartment(@Args('id') id: string) {
    return this.departmentService.delete(id);
  }
}
