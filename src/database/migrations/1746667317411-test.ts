import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1746667317411 implements MigrationInterface {
    name = 'Test1746667317411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipos_documentos" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, CONSTRAINT "UQ_68c2e6658d2103ceeab326ae820" UNIQUE ("nombre"), CONSTRAINT "PK_f7b9d2db451a496aadca22c0059" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documentos" ("id" SERIAL NOT NULL, "viaje_id" integer NOT NULL, "tipo_id" integer NOT NULL, "link" character varying(255) NOT NULL, "observaciones" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30b7ee230a352e7582842d1dc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empresas" ("id" SERIAL NOT NULL, "nit" character varying NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, "telefono" character varying, "celular" character varying, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3815a71fa4034941beaf0051189" UNIQUE ("nit"), CONSTRAINT "UQ_fe5e0374ec6d7d7dfbe04446903" UNIQUE ("email"), CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Departamentos" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "codigo" character varying(10), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9379183241f7804bd3bd54a4596" UNIQUE ("codigo"), CONSTRAINT "PK_e31f2730682c337e4e6a405591b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "municipios" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "codigo" character varying(10), "departamento_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ca61f54e17be66859316ac5d87b" UNIQUE ("codigo"), CONSTRAINT "PK_10d04b4b4e39ba40240b61e919d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "viajes" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "manifiesto" character varying(100) NOT NULL, "valor" numeric(15,2) NOT NULL, "comision" numeric(15,2) NOT NULL DEFAULT '0', "descargue" numeric(15,2) NOT NULL DEFAULT '0', "cheque" numeric(15,2) NOT NULL DEFAULT '0', "total_neto" numeric(15,2) NOT NULL, "porcentaje_65" numeric(15,2) NOT NULL DEFAULT '0', "porcentaje_35" numeric(15,2) NOT NULL DEFAULT '0', "valor_anticipo" numeric(15,2) NOT NULL DEFAULT '0', "saldo_a_pagar" numeric(15,2) NOT NULL DEFAULT '0', "saldos_anticipos" numeric(15,2) NOT NULL DEFAULT '0', "pago_completado" boolean NOT NULL DEFAULT false, "link_comprobante" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "empresa_id" integer NOT NULL, "origen_id" integer NOT NULL, "destino_id" integer NOT NULL, CONSTRAINT "UQ_a35b04e26684154eeed46e79f6f" UNIQUE ("manifiesto"), CONSTRAINT "PK_494f8b59dff1674f6b4efbcea2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "email" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "rol" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE ("username"), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movimientos" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "tipo" character varying(100) NOT NULL, "descripcion" character varying(255) NOT NULL, "valor" numeric(15,2) NOT NULL, "link" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_519702aa97def3e7c1b6cc5e2f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_081c11a5aa1820c4e0ff0f5c16a" FOREIGN KEY ("viaje_id") REFERENCES "viajes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_894d06e65134abbbdb2cd4ca35e" FOREIGN KEY ("tipo_id") REFERENCES "tipos_documentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "municipios" ADD CONSTRAINT "FK_cfc60523878116f625631f0e251" FOREIGN KEY ("departamento_id") REFERENCES "Departamentos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viajes" ADD CONSTRAINT "FK_6b172d74872502a9018df3dbac4" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viajes" ADD CONSTRAINT "FK_f0786e2268c523e2f6e16084b38" FOREIGN KEY ("origen_id") REFERENCES "municipios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viajes" ADD CONSTRAINT "FK_0b322232c28cb9b4e6c8cbef892" FOREIGN KEY ("destino_id") REFERENCES "municipios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "viajes" DROP CONSTRAINT "FK_0b322232c28cb9b4e6c8cbef892"`);
        await queryRunner.query(`ALTER TABLE "viajes" DROP CONSTRAINT "FK_f0786e2268c523e2f6e16084b38"`);
        await queryRunner.query(`ALTER TABLE "viajes" DROP CONSTRAINT "FK_6b172d74872502a9018df3dbac4"`);
        await queryRunner.query(`ALTER TABLE "municipios" DROP CONSTRAINT "FK_cfc60523878116f625631f0e251"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_894d06e65134abbbdb2cd4ca35e"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_081c11a5aa1820c4e0ff0f5c16a"`);
        await queryRunner.query(`DROP TABLE "movimientos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "viajes"`);
        await queryRunner.query(`DROP TABLE "municipios"`);
        await queryRunner.query(`DROP TABLE "Departamentos"`);
        await queryRunner.query(`DROP TABLE "empresas"`);
        await queryRunner.query(`DROP TABLE "documentos"`);
        await queryRunner.query(`DROP TABLE "tipos_documentos"`);
    }

}
