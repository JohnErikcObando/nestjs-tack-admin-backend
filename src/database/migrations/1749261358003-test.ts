import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1749261358003 implements MigrationInterface {
    name = 'Test1749261358003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentos" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentos" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
