import { AppBaseModel } from "@/models/app/base-model";
import { UUID } from "crypto";
import { AppBoerenbridgeRound } from "@/models/app/boerenbridge-round/boeren-bridge-round";

export type AppBoerenbridgePlayer = AppBaseModel & {
    name: string;
    game: UUID;
    rounds: Array<AppBoerenbridgeRound>;
};
