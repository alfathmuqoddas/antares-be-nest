import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1774418794827 implements MigrationInterface {
    name = 'InitialSchema1774418794827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nest-product-be"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "nest-product-be"."user" ("id") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "imdbId" character varying NOT NULL DEFAULT '', "title" character varying NOT NULL DEFAULT '', "year" character varying NOT NULL DEFAULT '', "rated" character varying NOT NULL DEFAULT '', "released" character varying NOT NULL DEFAULT '', "runtime" character varying NOT NULL DEFAULT '', "genre" character varying NOT NULL DEFAULT '', "director" character varying NOT NULL DEFAULT '', "writer" character varying NOT NULL DEFAULT '', "actors" character varying NOT NULL DEFAULT '', "plot" character varying NOT NULL DEFAULT '', "language" character varying NOT NULL DEFAULT '', "country" character varying NOT NULL DEFAULT '', "awards" character varying NOT NULL DEFAULT '', "poster" character varying NOT NULL DEFAULT '', "nowPlaying" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb3bb4d61cf764dc035cbedd42" ON "nest-product-be"."movie" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_454288774942b99d5127fb4173" ON "nest-product-be"."movie" ("slug") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."showtime" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startTime" TIMESTAMP WITH TIME ZONE NOT NULL, "ticketPrice" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "screenId" uuid, "movieId" uuid, CONSTRAINT "PK_46e9942cf953d98b7dc4392a3e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_46e9942cf953d98b7dc4392a3e" ON "nest-product-be"."showtime" ("id") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."seat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rowNumber" integer NOT NULL, "columnNumber" integer NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "screenId" uuid, CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e72ae40c3fbd7711ccb380ac1" ON "nest-product-be"."seat" ("id") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."screen" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "screenType" character varying NOT NULL DEFAULT 'regular', "capacity" integer NOT NULL, "layoutDescription" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "theaterId" uuid, CONSTRAINT "PK_7d30806a7556636b84d24e75f4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d30806a7556636b84d24e75f4" ON "nest-product-be"."screen" ("id") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."theater" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying, "address" character varying, "city" character varying NOT NULL, "state" character varying, "zip" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c70874202894cfb1575a5b2b743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c70874202894cfb1575a5b2b74" ON "nest-product-be"."theater" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b626c12e13a9960a394ac25a3c" ON "nest-product-be"."theater" ("slug") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "category" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c084eba2d3b157314de79135f0" ON "nest-product-be"."component" ("id") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c4e4a89e3674fc9f382d733f0" ON "nest-product-be"."category" ("id") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "showtimeId" character varying NOT NULL, "bookingTime" TIMESTAMP NOT NULL, "totalAmount" integer NOT NULL, "bookingReference" character varying NOT NULL, "paymentStatus" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_49171efc69702ed84c812f3354" ON "nest-product-be"."booking" ("id") `);
        await queryRunner.query(`CREATE TABLE "nest-product-be"."booking_seat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookingId" character varying NOT NULL, "seatId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_811c9d76b79bdfa812780cab0c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_811c9d76b79bdfa812780cab0c" ON "nest-product-be"."booking_seat" ("id") `);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."showtime" ADD CONSTRAINT "FK_c723afd3a25e576a86d90c16d6f" FOREIGN KEY ("screenId") REFERENCES "nest-product-be"."screen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."showtime" ADD CONSTRAINT "FK_1af27f8171269552599f8e18ff1" FOREIGN KEY ("movieId") REFERENCES "nest-product-be"."movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" ADD CONSTRAINT "FK_1140d3d30847c3a13faa0a43329" FOREIGN KEY ("screenId") REFERENCES "nest-product-be"."screen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."screen" ADD CONSTRAINT "FK_251c9d2385c1ddcc67bb2e718e6" FOREIGN KEY ("theaterId") REFERENCES "nest-product-be"."theater"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest-product-be"."screen" DROP CONSTRAINT "FK_251c9d2385c1ddcc67bb2e718e6"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."seat" DROP CONSTRAINT "FK_1140d3d30847c3a13faa0a43329"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."showtime" DROP CONSTRAINT "FK_1af27f8171269552599f8e18ff1"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."showtime" DROP CONSTRAINT "FK_c723afd3a25e576a86d90c16d6f"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_811c9d76b79bdfa812780cab0c"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."booking_seat"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_49171efc69702ed84c812f3354"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."booking"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_9c4e4a89e3674fc9f382d733f0"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."category"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_c084eba2d3b157314de79135f0"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."component"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_b626c12e13a9960a394ac25a3c"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_c70874202894cfb1575a5b2b74"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."theater"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_7d30806a7556636b84d24e75f4"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."screen"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_4e72ae40c3fbd7711ccb380ac1"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."seat"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_46e9942cf953d98b7dc4392a3e"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."showtime"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_454288774942b99d5127fb4173"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_cb3bb4d61cf764dc035cbedd42"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."movie"`);
        await queryRunner.query(`DROP INDEX "nest-product-be"."IDX_cace4a159ff9f2512dd4237376"`);
        await queryRunner.query(`DROP TABLE "nest-product-be"."user"`);
    }

}
