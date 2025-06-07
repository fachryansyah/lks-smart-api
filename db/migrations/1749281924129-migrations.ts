import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1749281924129 implements MigrationInterface {
  name = 'Migrations1749281924129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipe_user" character varying NOT NULL, "nama" character varying NOT NULL, "alamat" text NOT NULL, "email" text NOT NULL, "username" character varying NOT NULL, "telepon" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
