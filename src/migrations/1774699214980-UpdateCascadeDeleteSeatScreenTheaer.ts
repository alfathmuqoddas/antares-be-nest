import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascadeDeleteSeatScreenTheaer1774699214980 implements MigrationInterface {
    name = 'UpdateCascadeDeleteSeatScreenTheaer1774699214980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP CONSTRAINT "FK_1140d3d30847c3a13faa0a43329"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."screen" DROP CONSTRAINT "FK_251c9d2385c1ddcc67bb2e718e6"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD CONSTRAINT "FK_1140d3d30847c3a13faa0a43329" FOREIGN KEY ("screenId") REFERENCES "nest-product-be"."screen"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."screen" ADD CONSTRAINT "FK_251c9d2385c1ddcc67bb2e718e6" FOREIGN KEY ("theaterId") REFERENCES "nest-product-be"."theater"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest-product-be"."screen" DROP CONSTRAINT "FK_251c9d2385c1ddcc67bb2e718e6"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP CONSTRAINT "FK_1140d3d30847c3a13faa0a43329"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."screen" ADD CONSTRAINT "FK_251c9d2385c1ddcc67bb2e718e6" FOREIGN KEY ("theaterId") REFERENCES "nest-product-be"."theater"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD CONSTRAINT "FK_1140d3d30847c3a13faa0a43329" FOREIGN KEY ("screenId") REFERENCES "nest-product-be"."screen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
