-- CreateEnum
CREATE TYPE "public"."game_type" AS ENUM ('boerenbridge', 'klaverjas');

-- CreateEnum
CREATE TYPE "public"."team_type" AS ENUM ('us', 'them');

-- AlterTable
ALTER TABLE "public"."klaverjas_team" DROP COLUMN "type",
ADD COLUMN     "type" "public"."team_type" NOT NULL;

-- AlterTable
ALTER TABLE "public"."scoreboard" DROP COLUMN "game_type",
ADD COLUMN     "game_type" "public"."game_type" NOT NULL;
