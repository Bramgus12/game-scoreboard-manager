-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."boerenbridge_game" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "current_round" INTEGER NOT NULL,
    "points_per_correct_guess" INTEGER NOT NULL,
    "scoreboard_id" UUID NOT NULL,

    CONSTRAINT "boerenbridge_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."boerenbridge_player" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "game_id" UUID NOT NULL,

    CONSTRAINT "boerenbridge_player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."boerenbridge_round" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "round_number" INTEGER NOT NULL,
    "guess" INTEGER NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "player_id" UUID NOT NULL,
    "penalty_points" INTEGER NOT NULL,

    CONSTRAINT "boerenbridge_round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."klaverjas_round" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "round_number" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "fame" INTEGER NOT NULL,
    "is_pit" BOOLEAN NOT NULL,
    "is_wet" BOOLEAN NOT NULL,
    "klaverjas_team_id" UUID NOT NULL,
    "is_going" BOOLEAN NOT NULL,

    CONSTRAINT "klaverjas_round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."klaverjas_team" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "scoreboard_id" UUID NOT NULL,

    CONSTRAINT "klaverjas_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."scoreboard" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "scoreboard_name" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "game_type" VARCHAR(255) NOT NULL,

    CONSTRAINT "scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "external_id" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."boerenbridge_game" ADD CONSTRAINT "boerenbridge_game_scoreboard_id_foreign" FOREIGN KEY ("scoreboard_id") REFERENCES "public"."scoreboard"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."boerenbridge_player" ADD CONSTRAINT "boerenbridge_player_game_id_foreign" FOREIGN KEY ("game_id") REFERENCES "public"."boerenbridge_game"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."boerenbridge_round" ADD CONSTRAINT "boerenbridge_round_player_id_foreign" FOREIGN KEY ("player_id") REFERENCES "public"."boerenbridge_player"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."klaverjas_round" ADD CONSTRAINT "klaverjas_round_klaverjas_team_id_foreign" FOREIGN KEY ("klaverjas_team_id") REFERENCES "public"."klaverjas_team"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."klaverjas_team" ADD CONSTRAINT "klaverjas_team_scoreboard_id_foreign" FOREIGN KEY ("scoreboard_id") REFERENCES "public"."scoreboard"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."scoreboard" ADD CONSTRAINT "scoreboard_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

