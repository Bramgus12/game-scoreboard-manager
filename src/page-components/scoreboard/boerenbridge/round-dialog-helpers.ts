import { AppBoerenbridgePlayer } from "@/models/app/boerenbridge-player/boerenbridge-player";
import { AppBoerenbridgeRoundRow } from "@/models/app/boerenbridge-round/boerenbridge-round-row";
import { CreateBoerenbridgeRoundFormInput } from "@/validation/create-boerenbridge-round-schema";

export function getInitialRoundDialogValues(
    players: Array<AppBoerenbridgePlayer>,
    roundNumber: number,
    editRound?: AppBoerenbridgeRoundRow,
): CreateBoerenbridgeRoundFormInput {
    if (editRound != null) {
        return {
            roundNumber: String(editRound.roundNumber),
            entries: players.map((player) => {
                const entry = editRound.entries.find(
                    (roundEntry) => roundEntry.playerId === player.id,
                );

                return {
                    playerId: player.id,
                    expectedWins: String(entry?.expectedWins ?? 0),
                    actualWins: String(entry?.actualWins ?? 0),
                };
            }),
        };
    }

    return {
        roundNumber: String(roundNumber),
        entries: players.map((player) => ({
            playerId: player.id,
            expectedWins: "0",
            actualWins: "0",
        })),
    };
}

export function hasExpectedWinsRangeError(
    expectedWins: number,
    currentRound: number,
): boolean {
    return expectedWins < 0 || expectedWins > currentRound;
}

export function coerceToNumber(value: string | number | undefined): number {
    if (typeof value === "number") {
        return Number.isNaN(value) ? 0 : value;
    }

    if (typeof value !== "string") {
        return 0;
    }

    const parsedValue = Number(value);

    return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

function getRoundOptions(round: number): number[] {
    return Array.from({ length: round + 1 }, (_, index) => index);
}

export function getExpectedWinsOptions(
    round: number,
    playerCount: number,
): number[] {
    // Global rule: sum(expectedWins) !== round.
    // For a single-player game this means the player's choice cannot be exactly round.
    if (playerCount <= 1) {
        return getRoundOptions(round).filter((option) => option !== round);
    }

    return getRoundOptions(round);
}

export function getActualWinsOptions(round: number, playerCount: number): number[] {
    return getRoundOptions(round).filter((option) => {
        const remainingWins = round - option;
        const maxWinsForOtherPlayers = (playerCount - 1) * round;

        return remainingWins >= 0 && remainingWins <= maxWinsForOtherPlayers;
    });
}
