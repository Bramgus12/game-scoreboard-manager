import { UUID } from "crypto";
import { getJson, postJson } from "@/api/client";
import { AppMahjongGame } from "@/models/app/mahjong/game";
import { AppMahjongPlayer } from "@/models/app/mahjong/player";
import { AppMahjongHand } from "@/models/app/mahjong/hand";
import { AppMahjongHandState } from "@/models/app/mahjong/hand-state";
import { AppMahjongPlayerTotal } from "@/models/app/mahjong/total";
import { CreateMahjongHandForm } from "@/validation/create-mahjong-hand-schema";

function toMahjongGame(game: AppMahjongGame): AppMahjongGame {
    return {
        ...game,
        createdAt: new Date(game.createdAt),
        updatedAt: new Date(game.updatedAt),
    };
}

function toMahjongPlayers(
    players: Array<AppMahjongPlayer>,
): Array<AppMahjongPlayer> {
    return players.map((player) => ({
        ...player,
        createdAt: new Date(player.createdAt),
        updatedAt: new Date(player.updatedAt),
    }));
}

function toMahjongHands(hands: Array<AppMahjongHand>): Array<AppMahjongHand> {
    return hands.map((hand) => ({
        ...hand,
        createdAt: new Date(hand.createdAt),
        updatedAt: new Date(hand.updatedAt),
    }));
}

export async function getMahjongGame(scoreboardId: UUID): Promise<AppMahjongGame> {
    const game = await getJson<AppMahjongGame>(
        `/scoreboards/${scoreboardId}/mahjong/game`,
    );

    return toMahjongGame(game);
}

export async function getMahjongPlayers(
    scoreboardId: UUID,
): Promise<Array<AppMahjongPlayer>> {
    const players = await getJson<Array<AppMahjongPlayer>>(
        `/scoreboards/${scoreboardId}/mahjong/players`,
    );

    return toMahjongPlayers(players);
}

export async function getMahjongHands(
    scoreboardId: UUID,
): Promise<Array<AppMahjongHand>> {
    const hands = await getJson<Array<AppMahjongHand>>(
        `/scoreboards/${scoreboardId}/mahjong/hands`,
    );

    return toMahjongHands(hands);
}

export async function createMahjongHand(
    scoreboardId: UUID,
    payload: CreateMahjongHandForm,
) {
    await postJson<CreateMahjongHandForm, void>(
        `/scoreboards/${scoreboardId}/mahjong/hands`,
        payload,
    );
}

export async function getMahjongTotals(
    scoreboardId: UUID,
): Promise<Array<AppMahjongPlayerTotal>> {
    return getJson<Array<AppMahjongPlayerTotal>>(
        `/scoreboards/${scoreboardId}/mahjong/totals`,
    );
}

export async function getMahjongHandState(
    scoreboardId: UUID,
): Promise<AppMahjongHandState> {
    return getJson<AppMahjongHandState>(
        `/scoreboards/${scoreboardId}/mahjong/hand-state`,
    );
}
