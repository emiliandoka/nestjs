import { MigrationInterface, QueryRunner } from "typeorm"

export class tagstable1662558817026 implements MigrationInterface {
    name?: string;
    down(queryRunner: QueryRunner): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TAGS"{"id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_efwefq344aq234eqedq3" PRIMARY KEY ("id))`)};
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await QueryRunner.query(`DROP TABLE "tags"`);
    }

}
