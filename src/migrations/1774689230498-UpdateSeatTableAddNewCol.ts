import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSeatTableAddNewCol1774689230498 implements MigrationInterface {
    name = 'UpdateSeatTableAddNewCol1774689230498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "rowNumber"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "columnNumber"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "isAvailable"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "gridRow" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "gridCol" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "rowLabel" character varying`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "seatNumber" integer`);
        await queryRunner.query(`CREATE TYPE "nest-product-be"."seat_status_enum" AS ENUM('available', 'unavailable')`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "status" "nest-product-be"."seat_status_enum" NOT NULL DEFAULT 'available'`);
        await queryRunner.query(`CREATE TYPE "nest-product-be"."seat_type_enum" AS ENUM('seat', 'aisle', 'gap')`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "type" "nest-product-be"."seat_type_enum" NOT NULL DEFAULT 'seat'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "nest-product-be"."seat_type_enum"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "nest-product-be"."seat_status_enum"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "seatNumber"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "rowLabel"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "gridCol"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP COLUMN "gridRow"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "isAvailable" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "columnNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD "rowNumber" integer NOT NULL`);
    }

}
