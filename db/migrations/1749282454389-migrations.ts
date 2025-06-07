import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1749282454389 implements MigrationInterface {
  name = 'Migrations1749282454389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "kode_barang" character varying NOT NULL, "nama_barang" character varying NOT NULL, "expired_date" character varying NOT NULL, "jumlah_barang" character varying NOT NULL, "satuan" character varying NOT NULL, "harga_satuan" numeric(12,2) NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
