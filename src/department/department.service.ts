import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { SubDepartment } from './entities/sub-department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(input: CreateDepartmentInput) {
    const { name, subDepartments } = input;

    // Check if department name is already taken (if required)
    const existingDepartment = await this.departmentRepository.findOneBy({
      name,
    });

    if (existingDepartment) {
      throw new ConflictException('Department with this name already exists');
    }

    const queryRunner =
      this.departmentRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const department = this.departmentRepository.create({ name });
      await queryRunner.manager.save(department);

      if (subDepartments && subDepartments.length > 0) {
        const subDeptEntities = subDepartments.map((subDeptInput) => {
          const subDepartment = this.subDepartmentRepository.create({
            ...subDeptInput,
            department,
          });
          return subDepartment;
        });

        await queryRunner.manager.save(subDeptEntities);
        department.subDepartments = subDeptEntities;
      }

      await queryRunner.commitTransaction();

      const data = { department };
      return {
        message: 'Department created successfully',
        data,
      };
    } catch {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Failed to create department');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(limit: number = 10, offset: number = 0) {
    try {
      const [departments, total] = await this.departmentRepository.findAndCount(
        {
          relations: ['subDepartments'],
          take: limit,
          skip: offset,
        },
      );

      const data = { departments, total };
      return { message: 'All departments retrieved successfully', data };
    } catch {
      throw new BadRequestException('Failed to retrieve departments');
    }
  }

  async findOne(id: string) {
    try {
      const department = this.departmentRepository.findOne({
        where: { id },
        relations: ['subDepartments'],
      });

      if (!department) {
        throw new NotFoundException('Department not found');
      }

      const data = { department };
      return { message: 'Department data retrieved successfully', data };
    } catch {
      throw new BadRequestException('Failed to retrieve department data');
    }
  }

  async update(input: UpdateDepartmentInput) {
    const { id, name } = input;

    const department = await this.departmentRepository.findOneBy({ id });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    department.name = name;

    try {
      await this.departmentRepository.save(department);

      const data = { department };
      return {
        message: 'Department data updated successfully',
        data,
      };
    } catch {
      throw new BadRequestException('Failed to update department');
    }
  }

  async delete(id: string) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    try {
      const subDepartments = department.subDepartments;
      await Promise.all(
        subDepartments.map((dept) =>
          this.subDepartmentRepository.delete(dept.id),
        ),
      );

      await this.departmentRepository.delete({ id });

      return {
        message: 'Department and its sub-departments deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete department and its sub-departments',
      );
    }
  }
}
