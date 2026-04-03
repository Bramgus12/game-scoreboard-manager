import { AppBaseModel } from "@/models/app/base-model";

export type AppBoerenbridgeRound = AppBaseModel & {
    roundNumber: number;
    expectedWins: number;
    actualWins: number;
};
