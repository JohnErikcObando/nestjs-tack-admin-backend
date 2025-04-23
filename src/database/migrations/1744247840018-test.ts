import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1744247840018 implements MigrationInterface {
    name = 'Test1744247840018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "viajes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "viajes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "viajes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "viajes" DROP COLUMN "createdAt"`);
    }

}
