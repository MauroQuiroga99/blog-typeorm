import { MigrationInterface, QueryRunner } from "typeorm";

export class Blog1736352594886 implements MigrationInterface {
    name = 'Blog1736352594886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT true`);
    }

}
