export const scoreboardCurrentPage = {
    oneVsTwo: "{{one}} vs {{two}}",
    newRound: "Nieuwe ronde",
    totals: {
        title: "Totalen",
        error: "Probleem bij het ophalen van de totalen",
    },
    deleteDialog: {
        title: "Verwijder ronde?",
        description: "Weet je zeker dat je deze ronde wil verwijderen?",
        cancel: "Annuleer",
        delete: "Verwijder",
    },
    currentRoundNumber: {
        error: "Probleem bij het ophalen van het huidige ronde nummer",
        title: "Huidig rondenummer",
    },
    table: {
        error: "Probleem bij het ophalen van de rondes",
        noRoundsPlayedYet: "Geen rondes hebben nog plaatsgevonden",
        createNewRound: "Maak een nieuwe ronde",
        us: "Wij",
        them: "Zij",
        edit: "Aanpassen",
        delete: "Verwijderen",
    },
    roundDialog: {
        step1: {
            title: "Wie gaat er?",
            selectGoingTeam: "Selecteer het team dat gaat deze ronde",
        },
        step2: { title: "Registreer roem", keepTrack: "Houd roem bij" },
        step3: {
            title: "Tel punten",
            countCards: "Tel de kaarten",
            pit: "Pit",
            wet: "Nat",
        },
        next: "Volgende",
        finish: "Klaar",
        us: "Wij",
        them: "Zij",
    },
} as const;
