import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import { randomUUID } from "node:crypto";
import { UUID } from "crypto";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";
import { GAME_TYPE } from "@/constants/gameType";
import { AppCreateBoerenbridgePlayer } from "@/models/app/boerenbridge-player/create-boerenbridge-player";
import { AppScoreboardsStats } from "@/models/app/scoreboard/scoreboard-stats";
import { AppMahjongRuleProfile } from "@/models/app/mahjong/rule-profile";

type RawScoreboardsStatsRow = {
    klaverjas_game_count: number | string | bigint | { toString(): string } | null;
    klaverjas_pit_count: number | string | bigint | { toString(): string } | null;
    klaverjas_avg_points_per_team:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
    klaverjas_avg_nat_per_game:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
    boerenbridge_game_count:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
    boerenbridge_correct_count:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
    boerenbridge_wrong_count:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
    boerenbridge_avg_points_per_player_per_game:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
    mahjong_game_count: number | string | bigint | { toString(): string } | null;
    mahjong_winning_hand_count:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
    mahjong_remise_count: number | string | bigint | { toString(): string } | null;
    mahjong_avg_winning_points:
        | number
        | string
        | bigint
        | { toString(): string }
        | null;
};

function toNumber(
    value: number | string | bigint | { toString(): string } | null | undefined,
): number {
    if (typeof value === "number") {
        return value;
    }

    if (typeof value === "bigint") {
        return Number(value);
    }

    if (typeof value === "string") {
        const parsed = Number(value);

        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    if (
        typeof value === "object" &&
        value != null &&
        typeof value.toString === "function"
    ) {
        const parsed = Number(value.toString());

        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    return 0;
}

export async function createScoreboard(scoreboard: AppCreateScoreboard) {
    const user = await getDatabaseUser();

    return prisma.scoreboard.create({
        data: {
            user_id: user.id,
            created_at: new Date(),
            updated_at: new Date(),
            game_type: scoreboard.gameType,
            scoreboard_name: scoreboard.scoreboardName,
            id: randomUUID(),
        },
    });
}

type CreateBoerenbridgeScoreboardWithGamePayload = {
    scoreboardName: string;
    pointsPerCorrectGuess: number;
    players: Array<AppCreateBoerenbridgePlayer>;
};

type CreateMahjongScoreboardWithGamePayload = {
    scoreboardName: string;
    players: Array<{ name: string }>;
    handLimit: number;
    pointsLimit: number;
    ruleProfile: AppMahjongRuleProfile;
};

export async function createBoerenbridgeScoreboardWithGame(
    payload: CreateBoerenbridgeScoreboardWithGamePayload,
) {
    const user = await getDatabaseUser();

    return await prisma.$transaction(async (transaction) => {
        const scoreboardId = randomUUID();
        const gameId = randomUUID();

        const scoreboard = await transaction.scoreboard.create({
            data: {
                id: scoreboardId,
                user_id: user.id,
                created_at: new Date(),
                updated_at: new Date(),
                game_type: GAME_TYPE.BOERENBRIDGE,
                scoreboard_name: payload.scoreboardName,
            },
        });

        await transaction.boerenbridge_game.create({
            data: {
                id: gameId,
                scoreboard_id: scoreboardId,
                created_at: new Date(),
                updated_at: new Date(),
                current_round: 1,
                points_per_correct_guess: payload.pointsPerCorrectGuess,
            },
        });

        await transaction.boerenbridge_player.createMany({
            data: payload.players.map((player) => ({
                id: randomUUID(),
                game_id: gameId,
                created_at: new Date(),
                updated_at: new Date(),
                name: player.name,
            })),
        });

        return scoreboard;
    });
}

export async function createMahjongScoreboardWithGame(
    payload: CreateMahjongScoreboardWithGamePayload,
) {
    const user = await getDatabaseUser();

    if (payload.players.length !== 4) {
        throw new Error("Mahjong requires exactly 4 players");
    }

    return await prisma.$transaction(async (transaction) => {
        const scoreboardId = randomUUID();
        const gameId = randomUUID();

        const scoreboard = await transaction.scoreboard.create({
            data: {
                id: scoreboardId,
                user_id: user.id,
                created_at: new Date(),
                updated_at: new Date(),
                game_type: GAME_TYPE.MAHJONG,
                scoreboard_name: payload.scoreboardName,
            },
        });

        await transaction.mahjong_game.create({
            data: {
                id: gameId,
                scoreboard_id: scoreboardId,
                created_at: new Date(),
                updated_at: new Date(),
                points_limit: payload.pointsLimit,
                hand_limit: payload.handLimit,
                rule_profile: payload.ruleProfile,
            },
        });

        await transaction.mahjong_player.createMany({
            data: payload.players.map((player, index) => ({
                id: randomUUID(),
                game_id: gameId,
                created_at: new Date(),
                updated_at: new Date(),
                name: player.name,
                seat_index: index,
            })),
        });

        return scoreboard;
    });
}

export async function getScoreboardsForUser() {
    const user = await getDatabaseUser();

    return prisma.scoreboard.findMany({
        where: { user_id: user.id },
    });
}

export async function getScoreboardById(id: UUID) {
    const user = await getDatabaseUser();

    const scoreboard = await prisma.scoreboard.findFirst({
        where: { id, user_id: user.id },
    });

    if (scoreboard == null) {
        throw new Error("Scoreboard not found");
    }

    return scoreboard;
}

export async function deleteScoreboardById(id: UUID) {
    const user = await getDatabaseUser();

    const scoreboard = await prisma.scoreboard.findFirst({
        where: { id, user_id: user.id },
    });

    if (scoreboard == null) {
        throw new Error("Scoreboard not found");
    }

    await prisma.scoreboard.delete({
        where: { id: scoreboard.id },
    });
}

export async function getScoreboardsStatsForUser(): Promise<AppScoreboardsStats> {
    const user = await getDatabaseUser();

    const rows = await prisma.$queryRawUnsafe<Array<RawScoreboardsStatsRow>>(
        `
            WITH user_scoreboards AS (
                SELECT id, game_type
                FROM scoreboard
                WHERE user_id = $1::uuid
            ),
            klaverjas_scoreboards AS (
                SELECT id
                FROM user_scoreboards
                WHERE game_type = 'klaverjas'
            ),
            boerenbridge_games AS (
                SELECT bg.id, bg.points_per_correct_guess
                FROM boerenbridge_game bg
                INNER JOIN user_scoreboards us ON us.id = bg.scoreboard_id
                WHERE us.game_type = 'boerenbridge'
            ),
            klaverjas_pit_count AS (
                SELECT COUNT(*) FILTER (WHERE kr.is_pit) AS pit_count
                FROM klaverjas_round kr
                INNER JOIN klaverjas_team kt ON kt.id = kr.klaverjas_team_id
                INNER JOIN klaverjas_scoreboards ks ON ks.id = kt.scoreboard_id
            ),
            klaverjas_team_totals AS (
                SELECT
                    kt.id AS team_id,
                    COALESCE(SUM(kr.points + kr.fame), 0)::numeric AS total_points
                FROM klaverjas_team kt
                INNER JOIN klaverjas_scoreboards ks ON ks.id = kt.scoreboard_id
                LEFT JOIN klaverjas_round kr ON kr.klaverjas_team_id = kt.id
                GROUP BY kt.id
            ),
            klaverjas_nat_per_game AS (
                SELECT
                    ks.id AS scoreboard_id,
                    COALESCE(COUNT(*) FILTER (WHERE kr.is_wet), 0)::numeric AS nat_count
                FROM klaverjas_scoreboards ks
                LEFT JOIN klaverjas_team kt ON kt.scoreboard_id = ks.id
                LEFT JOIN klaverjas_round kr ON kr.klaverjas_team_id = kt.id
                GROUP BY ks.id
            ),
            boerenbridge_guess_counts AS (
                SELECT
                    COUNT(*) FILTER (WHERE br.guess = br.penalty_points) AS correct_count,
                    COUNT(*) FILTER (WHERE br.guess <> br.penalty_points) AS wrong_count
                FROM boerenbridge_round br
                INNER JOIN boerenbridge_player bp ON bp.id = br.player_id
                INNER JOIN boerenbridge_games bg ON bg.id = bp.game_id
            ),
            boerenbridge_player_totals AS (
                SELECT
                    bp.id AS player_id,
                    COALESCE(
                        SUM(
                            CASE
                                WHEN br.id IS NULL THEN 0
                                WHEN br.guess = br.penalty_points THEN
                                    10 + (br.penalty_points * bg.points_per_correct_guess)
                                ELSE
                                    -(ABS(br.guess - br.penalty_points) * bg.points_per_correct_guess)
                            END
                        ),
                        0
                    )::numeric AS total_points
                FROM boerenbridge_player bp
                INNER JOIN boerenbridge_games bg ON bg.id = bp.game_id
                LEFT JOIN boerenbridge_round br ON br.player_id = bp.id
                GROUP BY bp.id
            ),
            mahjong_games AS (
                SELECT mg.id
                FROM mahjong_game mg
                INNER JOIN user_scoreboards us ON us.id = mg.scoreboard_id
                WHERE us.game_type = 'mahjong'
            ),
            mahjong_hand_stats AS (
                SELECT
                    COUNT(*) FILTER (WHERE mh.win_type <> 'remise') AS winning_hand_count,
                    COUNT(*) FILTER (WHERE mh.win_type = 'remise') AS remise_count,
                    COALESCE(
                        AVG(
                            CASE
                                WHEN mh.win_type <> 'remise' THEN mh.winner_points::double precision
                                ELSE NULL
                            END
                        ),
                        0
                    )::double precision AS avg_winning_points
                FROM mahjong_hand mh
                INNER JOIN mahjong_games mg ON mg.id = mh.game_id
            )
            SELECT
                (SELECT COUNT(*) FROM klaverjas_scoreboards) AS klaverjas_game_count,
                COALESCE((SELECT pit_count FROM klaverjas_pit_count), 0) AS klaverjas_pit_count,
                COALESCE((SELECT AVG(total_points)::double precision FROM klaverjas_team_totals), 0)::double precision AS klaverjas_avg_points_per_team,
                COALESCE((SELECT AVG(nat_count)::double precision FROM klaverjas_nat_per_game), 0)::double precision AS klaverjas_avg_nat_per_game,
                (SELECT COUNT(*) FROM boerenbridge_games) AS boerenbridge_game_count,
                COALESCE((SELECT correct_count FROM boerenbridge_guess_counts), 0) AS boerenbridge_correct_count,
                COALESCE((SELECT wrong_count FROM boerenbridge_guess_counts), 0) AS boerenbridge_wrong_count,
                COALESCE((SELECT AVG(total_points)::double precision FROM boerenbridge_player_totals), 0)::double precision AS boerenbridge_avg_points_per_player_per_game,
                (SELECT COUNT(*) FROM mahjong_games) AS mahjong_game_count,
                COALESCE((SELECT winning_hand_count FROM mahjong_hand_stats), 0) AS mahjong_winning_hand_count,
                COALESCE((SELECT remise_count FROM mahjong_hand_stats), 0) AS mahjong_remise_count,
                COALESCE((SELECT avg_winning_points FROM mahjong_hand_stats), 0)::double precision AS mahjong_avg_winning_points
        `,
        user.id,
    );

    const [row] = rows;

    if (row == null) {
        return {
            klaverjas: {
                gameCount: 0,
                pitCount: 0,
                averagePointsPerTeam: 0,
                averageNatTimesPerGame: 0,
            },
            boerenbridge: {
                gameCount: 0,
                correctGuessCount: 0,
                wrongGuessCount: 0,
                averagePointsPerPlayerPerGame: 0,
            },
            mahjong: {
                gameCount: 0,
                winningHandCount: 0,
                remiseCount: 0,
                averageWinningPoints: 0,
            },
        };
    }

    return {
        klaverjas: {
            gameCount: toNumber(row.klaverjas_game_count),
            pitCount: toNumber(row.klaverjas_pit_count),
            averagePointsPerTeam: toNumber(row.klaverjas_avg_points_per_team),
            averageNatTimesPerGame: toNumber(row.klaverjas_avg_nat_per_game),
        },
        boerenbridge: {
            gameCount: toNumber(row.boerenbridge_game_count),
            correctGuessCount: toNumber(row.boerenbridge_correct_count),
            wrongGuessCount: toNumber(row.boerenbridge_wrong_count),
            averagePointsPerPlayerPerGame: toNumber(
                row.boerenbridge_avg_points_per_player_per_game,
            ),
        },
        mahjong: {
            gameCount: toNumber(row.mahjong_game_count),
            winningHandCount: toNumber(row.mahjong_winning_hand_count),
            remiseCount: toNumber(row.mahjong_remise_count),
            averageWinningPoints: toNumber(row.mahjong_avg_winning_points),
        },
    };
}
