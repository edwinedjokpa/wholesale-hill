import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from './department.entity';

@Entity('sub_departments')
export class SubDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.subDepartments, {
    onDelete: 'CASCADE',
  })
  department: Department;
}
