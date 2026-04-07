import { GAME_TYPE } from "@/constants/gameType";
import { game_type } from "#/generated/prisma/enums";

type DomainScoreboardInput = {
    id?: string;
    user_id?: string;
    scoreboard_name?: string;
    game_type?: game_type;
    created_at?: Date;
    updated_at?: Date;
};

export function createDomainScoreboard(input: DomainScoreboardInput = {}) {
    return {
        id: input.id ?? "11111111-1111-4111-8111-111111111111",
        user_id: input.user_id ?? "22222222-2222-4222-8222-222222222222",
        scoreboard_name: input.scoreboard_name ?? "Friday Night",
        game_type: input.game_type ?? GAME_TYPE.BOERENBRIDGE,
        created_at: input.created_at ?? new Date("2026-01-01T00:00:00.000Z"),
        updated_at: input.updated_at ?? new Date("2026-01-01T00:00:00.000Z"),
    };
}
