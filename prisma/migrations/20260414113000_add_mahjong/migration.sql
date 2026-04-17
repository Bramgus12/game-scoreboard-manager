-- AlterEnum
ALTER TYPE "game_type" ADD VALUE 'mahjong';

-- CreateEnum
CREATE TYPE "mahjong_wind" AS ENUM ('east', 'south', 'west', 'north');

-- CreateEnum
CREATE TYPE "mahjong_win_type" AS ENUM ('self_draw', 'discard', 'remise');

-- CreateEnum
CREATE TYPE "mahjong_ruleset" AS ENUM ('nts_2002_2019_v1');

-- CreateTable
CREATE TABLE "mahjong_game" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "scoreboard_id" UUID NOT NULL,
    "points_limit" INTEGER NOT NULL,
    "hand_limit" INTEGER NOT NULL,
    "rule_profile" "mahjong_ruleset" NOT NULL,

    CONSTRAINT "mahjong_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mahjong_player" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "game_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "seat_index" INTEGER NOT NULL,

    CONSTRAINT "mahjong_player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mahjong_hand" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "game_id" UUID NOT NULL,
    "hand_number" INTEGER NOT NULL,
    "prevailing_wind" "mahjong_wind" NOT NULL,
    "win_type" "mahjong_win_type" NOT NULL,
    "winner_player_id" UUID,
    "discarded_by_player_id" UUID,
    "winner_points" INTEGER NOT NULL,
    "is_limit_hand" BOOLEAN NOT NULL,

    CONSTRAINT "mahjong_hand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mahjong_player_game_id_seat_index_unique" ON "mahjong_player"("game_id", "seat_index");

-- CreateIndex
CREATE UNIQUE INDEX "mahjong_hand_game_id_hand_number_unique" ON "mahjong_hand"("game_id", "hand_number");

-- AddForeignKey
ALTER TABLE "mahjong_game" ADD CONSTRAINT "mahjong_game_scoreboard_id_foreign" FOREIGN KEY ("scoreboard_id") REFERENCES "scoreboard"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mahjong_player" ADD CONSTRAINT "mahjong_player_game_id_foreign" FOREIGN KEY ("game_id") REFERENCES "mahjong_game"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mahjong_hand" ADD CONSTRAINT "mahjong_hand_game_id_foreign" FOREIGN KEY ("game_id") REFERENCES "mahjong_game"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mahjong_hand" ADD CONSTRAINT "mahjong_hand_winner_player_id_foreign" FOREIGN KEY ("winner_player_id") REFERENCES "mahjong_player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mahjong_hand" ADD CONSTRAINT "mahjong_hand_discarded_by_player_id_foreign" FOREIGN KEY ("discarded_by_player_id") REFERENCES "mahjong_player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
