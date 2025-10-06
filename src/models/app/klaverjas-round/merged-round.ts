import { AppKlaverjasRound } from "@/models/app/klaverjas-round/klaverjas-round";

export type MergedRound = {
    roundNumber: number;
    team1: AppKlaverjasRound;
    team2: AppKlaverjasRound;
};
