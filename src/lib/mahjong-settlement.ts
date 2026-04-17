import { MAHJONG_WIND, MAHJONG_WIN_TYPE } from "@/constants/mahjong";
import { AppMahjongPlayer } from "@/models/app/mahjong/player";
import { AppMahjongWind } from "@/models/app/mahjong/wind";
import { AppMahjongHand } from "@/models/app/mahjong/hand";

const WIND_ORDER: Array<AppMahjongWind> = [
    MAHJONG_WIND.EAST,
    MAHJONG_WIND.SOUTH,
    MAHJONG_WIND.WEST,
    MAHJONG_WIND.NORTH,
];

export function getPrevailingWindForHand(handNumber: number): AppMahjongWind {
    const index = Math.floor((handNumber - 1) / 4) % WIND_ORDER.length;

    return WIND_ORDER[index];
}

export function getWindBySeatIndex(
    seatIndex: number,
    handNumber: number,
): AppMahjongWind {
    const offset = (handNumber - 1) % WIND_ORDER.length;
    const windIndex =
        (seatIndex - offset + WIND_ORDER.length * 2) % WIND_ORDER.length;

    return WIND_ORDER[windIndex];
}

export function getCurrentWindsByPlayer(
    players: Array<AppMahjongPlayer>,
    handNumber: number,
): Record<string, AppMahjongWind> {
    const windsByPlayerId: Record<string, AppMahjongWind> = {};

    players.forEach((player) => {
        windsByPlayerId[player.id] = getWindBySeatIndex(
            player.seatIndex,
            handNumber,
        );
    });

    return windsByPlayerId;
}

export function calculateMahjongHandDeltas(
    hand: AppMahjongHand,
    players: Array<AppMahjongPlayer>,
): Record<string, number> {
    const base: Record<string, number> = {};

    players.forEach((player) => {
        base[player.id] = 0;
    });

    if (hand.winType === MAHJONG_WIN_TYPE.REMISE || hand.winnerPlayerId == null) {
        return base;
    }

    const winnerPlayerId = hand.winnerPlayerId;

    const windsByPlayer = getCurrentWindsByPlayer(players, hand.handNumber);
    const winnerWind = windsByPlayer[winnerPlayerId];

    players.forEach((player) => {
        if (player.id === winnerPlayerId) {
            return;
        }

        const loserWind = windsByPlayer[player.id];
        const multiplier =
            winnerWind === MAHJONG_WIND.EAST || loserWind === MAHJONG_WIND.EAST
                ? 2
                : 1;
        const payment = hand.winnerPoints * multiplier;

        base[winnerPlayerId] += payment;
        base[player.id] -= payment;
    });

    return base;
}
