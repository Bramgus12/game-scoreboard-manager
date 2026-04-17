import {
    MAHJONG_RULE_PROFILE,
    MAHJONG_WIND,
    MAHJONG_WIN_TYPE,
} from "@/constants/mahjong";
import { AppMahjongRuleProfile } from "@/models/app/mahjong/rule-profile";
import { AppMahjongWind } from "@/models/app/mahjong/wind";
import { AppMahjongWinType } from "@/models/app/mahjong/win-type";

export function isAppMahjongWind(value: string): value is AppMahjongWind {
    return (
        value === MAHJONG_WIND.EAST ||
        value === MAHJONG_WIND.SOUTH ||
        value === MAHJONG_WIND.WEST ||
        value === MAHJONG_WIND.NORTH
    );
}

export function parseAppMahjongWind(value: string): AppMahjongWind {
    if (!isAppMahjongWind(value)) {
        throw new Error("Invalid mahjong wind");
    }

    return value;
}

export function isAppMahjongWinType(value: string): value is AppMahjongWinType {
    return (
        value === MAHJONG_WIN_TYPE.SELF_DRAW ||
        value === MAHJONG_WIN_TYPE.DISCARD ||
        value === MAHJONG_WIN_TYPE.REMISE
    );
}

export function parseAppMahjongWinType(value: string): AppMahjongWinType {
    if (!isAppMahjongWinType(value)) {
        throw new Error("Invalid mahjong win type");
    }

    return value;
}

export function isAppMahjongRuleProfile(
    value: string,
): value is AppMahjongRuleProfile {
    return value === MAHJONG_RULE_PROFILE.NTS_2002_2019_V1;
}

export function parseAppMahjongRuleProfile(value: string): AppMahjongRuleProfile {
    if (!isAppMahjongRuleProfile(value)) {
        throw new Error("Invalid mahjong rule profile");
    }

    return value;
}
