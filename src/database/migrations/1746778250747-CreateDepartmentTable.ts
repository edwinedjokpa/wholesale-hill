import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDepartmentTable1746778250747 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "departments" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying NOT NULL,
          CONSTRAINT "PK_departments" PRIMARY KEY ("id")
        );
      `);

    await queryRunner.query(`
        CREATE TABLE "sub_departments" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying NOT NULL,
          "departmentId" uuid,
          CONSTRAINT "PK_sub_departments" PRIMARY KEY ("id"),
          CONSTRAINT "FK_sub_dept_department" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE CASCADE
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sub_departments"`);
    await queryRunner.query(`DROP TABLE "departments"`);
  }
}
