import { TEAM_TYPE } from "@/constants/teamType";
import type { AppTeamType } from "@/models/app/klaverjas-team/team-type";
import type { UUID } from "crypto";

type AppKlaverjasRoundInput = {
    id?: UUID;
    roundNumber?: number;
    points?: number;
    fame?: number;
    isPit?: boolean;
    isWet?: boolean;
    isGoing?: boolean;
    klaverjasTeam?: UUID;
    createdAt?: Date;
    updatedAt?: Date;
};

type AppKlaverjasTeamInput = {
    id?: UUID;
    name?: string;
    type?: AppTeamType;
    scoreboard?: UUID;
    createdAt?: Date;
    updatedAt?: Date;
};

export function createAppKlaverjasRound(input: AppKlaverjasRoundInput = {}) {
    return {
        id: input.id ?? "55555555-5555-4555-8555-555555555555",
        roundNumber: input.roundNumber ?? 1,
        points: input.points ?? 82,
        fame: input.fame ?? 0,
        isPit: input.isPit ?? false,
        isWet: input.isWet ?? false,
        isGoing: input.isGoing ?? false,
        klaverjasTeam: input.klaverjasTeam ?? "66666666-6666-4666-8666-666666666666",
        createdAt: input.createdAt ?? new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: input.updatedAt ?? new Date("2026-01-01T00:00:00.000Z"),
    };
}

export function createAppKlaverjasTeam(input: AppKlaverjasTeamInput = {}) {
    return {
        id: input.id ?? "77777777-7777-4777-8777-777777777777",
        name: input.name ?? "Us",
        type: input.type ?? TEAM_TYPE.US,
        scoreboard: input.scoreboard ?? "88888888-8888-4888-8888-888888888888",
        createdAt: input.createdAt ?? new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: input.updatedAt ?? new Date("2026-01-01T00:00:00.000Z"),
    };
}
