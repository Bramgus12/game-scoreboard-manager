import { UUID } from "crypto";
import { randomUUID } from "node:crypto";
import { AppCreateBoerenbridgeRound } from "@/models/app/boerenbridge-round/create-boerenbridge-round";
import { AppUpdateBoerenbridgeRound } from "@/models/app/boerenbridge-round/update-boerenbridge-round";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";

type RoundEntryInput = {
    playerId: UUID;
    expectedWins: number;
    actualWins: number;
};

export async function createRoundEntriesForPlayers(
    scoreboardId: UUID,
    roundNumber: number,
    entries: Array<RoundEntryInput>,
) {
    const user = await getDatabaseUser();

    const existingRounds = await prisma.boerenbridge_round.findMany({
        where: {
            round_number: roundNumber,
            boerenbridge_player: {
                id: { in: entries.map((entry) => entry.playerId) },
                boerenbridge_game: {
                    scoreboard_id: scoreboardId,
                    scoreboard: {
                        user_id: user.id,
                    },
                },
            },
        },
    });

    if (existingRounds.length > 0) {
        throw new Error("Round already exists");
    }

    const createResult = await prisma.boerenbridge_round.createMany({
        data: entries.map((entry) => ({
            id: randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            round_number: roundNumber,
            player_id: entry.playerId,
            guess: entry.expectedWins,
            is_correct: false,
            penalty_points: entry.actualWins,
        })),
    });

    if (createResult.count !== entries.length) {
        throw new Error("Failed to create round entries");
    }
}

export async function updateRoundEntriesForPlayers(
    scoreboardId: UUID,
    roundNumber: number,
    entries: Array<RoundEntryInput>,
) {
    const user = await getDatabaseUser();

    const results = await Promise.all(
        entries.map((entry) =>
            prisma.boerenbridge_round.updateMany({
                where: {
                    player_id: entry.playerId,
                    round_number: roundNumber,
                    boerenbridge_player: {
                        boerenbridge_game: {
                            scoreboard_id: scoreboardId,
                            scoreboard: {
                                user_id: user.id,
                            },
                        },
                    },
                },
                data: {
                    guess: entry.expectedWins,
                    is_correct: false,
                    penalty_points: entry.actualWins,
                    updated_at: new Date(),
                },
            }),
        ),
    );

    const updatedRows = results.reduce(
        (accumulator, result) => accumulator + result.count,
        0,
    );

    if (updatedRows !== entries.length) {
        throw new Error("Failed to update all round entries");
    }
}

export function toRoundEntryInput(
    playerId: UUID,
    round: AppCreateBoerenbridgeRound | AppUpdateBoerenbridgeRound,
): RoundEntryInput {
    return {
        playerId,
        expectedWins: round.expectedWins,
        actualWins: round.actualWins,
    };
}
