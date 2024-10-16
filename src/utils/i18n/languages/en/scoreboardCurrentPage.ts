export const scoreboardCurrentPage = {
    oneVsTwo: "{{one}} vs {{two}}",
    newRound: "New round",
    totals: {
        title: "Totals",
        error: "Error happened while loading totals",
    },
    deleteDialog: {
        title: "Delete round?",
        description: "Are you sure you want to delete this round?",
        cancel: "Cancel",
        delete: "Delete",
    },
    currentRoundNumber: {
        error: "Error happened while loading current round number",
        title: "Current round no.",
    },
    table: {
        error: "Error happened while getting the rounds",
        noRoundsPlayedYet: "No rounds have been played yet",
        createNewRound: "Create new round",
        us: "Us",
        them: "Them",
        edit: "Edit",
        delete: "Delete",
    },
    roundDialog: {
        step1: {
            title: "Who is going?",
            selectGoingTeam: "Select the team that is going this round",
        },
        step2: { title: "Register fame", keepTrack: "Keep track of fame" },
        step3: {
            title: "Count points",
            countCards: "Count the cards",
            pit: "Pit",
            wet: "Wet",
        },
        next: "Next",
        finish: "Finish",
        us: "Us",
        them: "Them",
    },
} as const;
