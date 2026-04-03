import { GAME_TYPE } from "@/constants/gameType";
import { AppGameType } from "@/models/app/scoreboard/game-type";

export function isAppGameType(value: string): value is AppGameType {
    return value === GAME_TYPE.KLAVERJAS || value === GAME_TYPE.BOERENBRIDGE;
}

export function parseAppGameType(value: string): AppGameType {
    if (!isAppGameType(value)) {
        throw new Error("Invalid game type");
    }

    return value;
}
