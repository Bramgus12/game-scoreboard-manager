import { UUID } from "crypto";

export type AppUpdateKlaverjasRound = {
    roundNumber: number;
    points: number;
    fame: number;
    isPit: boolean;
    isWet: boolean;
    id: UUID;
    isGoing: boolean;
};
