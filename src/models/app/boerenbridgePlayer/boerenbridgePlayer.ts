import { AppBaseModel } from "@/models/app/BaseModel";
import { UUID } from "crypto";
import { AppBoerenbridgeRound } from "@/models/app/boerenbridgeRound/boerenbridgeRound";

export type AppBoerenbridgePlayer = AppBaseModel & {
    name: string;
    game: UUID;
    rounds: Array<AppBoerenbridgeRound>;
};
