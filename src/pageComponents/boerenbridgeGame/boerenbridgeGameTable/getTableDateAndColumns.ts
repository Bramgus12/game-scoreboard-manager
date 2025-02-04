import { AppBoerenbridgePlayer } from "@/models/app/boerenbridgePlayer/boerenbridgePlayer";
import { Round } from "@/pageComponents/boerenbridgeGame/boerenbridgeGameTable/index";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridgeGame/boerenbridgeGame";

function calculatePoints(
    guess: number,
    isCorrect: boolean,
    pointsPerGuess: number,
    penaltyPoints?: number,
) {
    if (isCorrect) {
        return 10 + pointsPerGuess * guess;
    }

    if (penaltyPoints != null) {
        return -(penaltyPoints * pointsPerGuess);
    }

    return 0;
}

function hasRoundNumber(roundToCheck: Partial<Round>): roundToCheck is Round {
    return roundToCheck.roundNumber != null;
}

// function getInitialValue(playerAmount: number) {
//     if (playerAmount > )
// }

export function createTableData(
    players: Array<AppBoerenbridgePlayer>,
    game: AppBoerenbridgeGame,
): Array<Round> {
    // const initialValue =

    return players.reduce<Array<Round>>((acc, currentValue) => {
        const { rounds } = currentValue;

        rounds.forEach((round) => {
            const alreadyExistingRound = acc.find(
                (r) => r.roundNumber === round.roundNumber,
            );
            if (alreadyExistingRound != null) {
                alreadyExistingRound[currentValue.name] = {
                    guess: round.guess,
                    points: calculatePoints(
                        round.guess,
                        round.isCorrect,
                        game.pointsPerCorrectGuess,
                        round.penaltyPoints,
                    ),
                };
                acc.splice(
                    acc.findIndex((r) => r.roundNumber === round.roundNumber),
                    1,
                    alreadyExistingRound,
                );
            } else {
                const newRound: Partial<Round> = {
                    [currentValue.name]: {
                        guess: round.guess,
                        points: calculatePoints(
                            round.guess,
                            round.isCorrect,
                            game.pointsPerCorrectGuess,
                            round.penaltyPoints,
                        ),
                    },
                };

                newRound.roundNumber = round.roundNumber;

                if (hasRoundNumber(newRound)) {
                    acc.push(newRound);
                }
            }
        });

        return acc;
    }, []);
}
