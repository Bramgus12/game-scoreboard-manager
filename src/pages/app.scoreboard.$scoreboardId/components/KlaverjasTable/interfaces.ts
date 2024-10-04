import { AppKlaverjasRound } from "models/app/klaverjasRound/KlaverjasRound";

export type MergedRound = {
    roundNumber: number;
    team1: AppKlaverjasRound;
    team2: AppKlaverjasRound;
};
