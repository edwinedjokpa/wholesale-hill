import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => SubDepartment, (subDept) => subDept.department, {
    nullable: true,
    cascade: true,
  })
  subDepartments: SubDepartment[];
}
