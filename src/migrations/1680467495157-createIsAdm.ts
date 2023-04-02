import { MigrationInterface, QueryRunner } from "typeorm";

export class createIsAdm1680467495157 implements MigrationInterface {
    name = 'createIsAdm1680467495157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdm" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdm"`);
    }

}
