import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1745371921866 implements MigrationInterface {
    name = 'Test1745371921866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "empresas" ("id" SERIAL NOT NULL, "nit" character varying NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, "telefono" character varying, "celular" character varying, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3815a71fa4034941beaf0051189" UNIQUE ("nit"), CONSTRAINT "UQ_fe5e0374ec6d7d7dfbe04446903" UNIQUE ("email"), CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "viajes" ("id" SERIAL NOT NULL, "manifiesto" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "origen" character varying NOT NULL, "destino" character varying NOT NULL, "valor" numeric(15,2) NOT NULL, "comision" numeric(15,2) NOT NULL DEFAULT '0', "descargue" numeric(15,2) NOT NULL DEFAULT '0', "cheque" numeric(15,2) NOT NULL DEFAULT '0', "total_neto" numeric(15,2) NOT NULL, "porcentaje_65" numeric(15,2) NOT NULL DEFAULT '0', "porcentaje_35" numeric(15,2) NOT NULL DEFAULT '0', "valor_anticipo" numeric(15,2) NOT NULL DEFAULT '0', "saldo_a_pagar" numeric(15,2) NOT NULL DEFAULT '0', "saldos_anticipos" numeric(15,2) NOT NULL DEFAULT '0', "pago_completado" boolean NOT NULL DEFAULT false, "link_comprobante" character varying NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "empresa_id" integer, CONSTRAINT "PK_494f8b59dff1674f6b4efbcea2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE ("username"), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "viajes" ADD CONSTRAINT "FK_6b172d74872502a9018df3dbac4" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "viajes" DROP CONSTRAINT "FK_6b172d74872502a9018df3dbac4"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "viajes"`);
        await queryRunner.query(`DROP TABLE "empresas"`);
    }

}
