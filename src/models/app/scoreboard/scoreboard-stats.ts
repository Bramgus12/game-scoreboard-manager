export type AppKlaverjasScoreboardStats = {
    gameCount: number;
    pitCount: number;
    averagePointsPerTeam: number;
    averageNatTimesPerGame: number;
};

export type AppBoerenbridgeScoreboardStats = {
    gameCount: number;
    correctGuessCount: number;
    wrongGuessCount: number;
    averagePointsPerPlayerPerGame: number;
};

export type AppScoreboardsStats = {
    klaverjas: AppKlaverjasScoreboardStats;
    boerenbridge: AppBoerenbridgeScoreboardStats;
};
