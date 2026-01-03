import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1767028345158 implements MigrationInterface {
    name = 'Migration1767028345158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_members" ("roomId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_151cb61c3e462093aa3b8e70f7b" PRIMARY KEY ("roomId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a27f901523ddfa2eaecb16a597" ON "room_members" ("roomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca3c84760fb37c2f14658a0a2e" ON "room_members" ("userId") `);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_65283be59094a73fed31ffeee4e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_members" ADD CONSTRAINT "FK_a27f901523ddfa2eaecb16a5976" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_members" ADD CONSTRAINT "FK_ca3c84760fb37c2f14658a0a2ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_members" DROP CONSTRAINT "FK_ca3c84760fb37c2f14658a0a2ec"`);
        await queryRunner.query(`ALTER TABLE "room_members" DROP CONSTRAINT "FK_a27f901523ddfa2eaecb16a5976"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_65283be59094a73fed31ffeee4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca3c84760fb37c2f14658a0a2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a27f901523ddfa2eaecb16a597"`);
        await queryRunner.query(`DROP TABLE "room_members"`);
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
