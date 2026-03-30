import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAccomodateBookingLogic1774872280482 implements MigrationInterface {
    name = 'UpdateAccomodateBookingLogic1774872280482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "bookingTime"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "bookingReference"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD "showtimeId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "bookingCode" character varying`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD CONSTRAINT "UQ_eb14bff781dc5580a532803a7ba" UNIQUE ("bookingCode")`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "totalPrice" numeric(10,2) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "nest-product-be"."booking_status_enum" AS ENUM('PENDING', 'PAID', 'CANCELLED', 'EXPIRED')`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "status" "nest-product-be"."booking_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "expiresAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP COLUMN "bookingId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD "bookingId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP COLUMN "seatId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD "seatId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "showtimeId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "showtimeId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD CONSTRAINT "UQ_a97a1928331c331b0c73d822d69" UNIQUE ("seatId", "showtimeId")`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD CONSTRAINT "FK_fe5014b9aaf5dc16c240c77d690" FOREIGN KEY ("bookingId") REFERENCES "nest-product-be"."booking"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD CONSTRAINT "FK_be357537c28833eca4c70c5c33d" FOREIGN KEY ("seatId") REFERENCES "nest-product-be"."seat"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD CONSTRAINT "FK_766346f0dc60ef1cd713a4fa629" FOREIGN KEY ("showtimeId") REFERENCES "nest-product-be"."showtime"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "nest-product-be"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD CONSTRAINT "FK_46a225e6b858f2b52ed98e3aec3" FOREIGN KEY ("showtimeId") REFERENCES "nest-product-be"."showtime"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP CONSTRAINT "FK_46a225e6b858f2b52ed98e3aec3"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP CONSTRAINT "FK_766346f0dc60ef1cd713a4fa629"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP CONSTRAINT "FK_be357537c28833eca4c70c5c33d"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP CONSTRAINT "FK_fe5014b9aaf5dc16c240c77d690"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP CONSTRAINT "UQ_a97a1928331c331b0c73d822d69"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "showtimeId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "showtimeId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP COLUMN "seatId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD "seatId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP COLUMN "bookingId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" ADD "bookingId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "nest-product-be"."booking_status_enum"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP CONSTRAINT "UQ_eb14bff781dc5580a532803a7ba"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" DROP COLUMN "bookingCode"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking_seat" DROP COLUMN "showtimeId"`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "paymentStatus" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "bookingReference" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "totalAmount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest-product-be"."booking" ADD "bookingTime" TIMESTAMP NOT NULL`);
    }

}
