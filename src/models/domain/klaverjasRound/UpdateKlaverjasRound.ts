import { UUID } from "crypto";

export type DomainUpdateKlaverjasRound = {
    roundNumber: number;
    points: number;
    fame: number;
    isPit: boolean;
    isWet: boolean;
    isGoing: boolean;
    id: UUID;
};
