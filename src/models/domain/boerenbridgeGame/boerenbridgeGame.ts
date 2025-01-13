import { DomainBaseModel } from "@/models/domain/BaseModel";

export type DomainBoerenbridgeGame = DomainBaseModel & {
    pointsPerCorrectGuess: number;
    currentRound: number;
};
