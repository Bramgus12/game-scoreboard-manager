import { apiRoutes } from "@/utils/api/useAPI";
import { UUID } from "crypto";
import { Language } from "@/app/i18n/settings";
import { Box } from "@mui/material";

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

type Round = Record<string, { guess: number; points: number }> & {
    roundNumber: number;
};

export default async function BoerenbridgeGameTable(props: {
    scoreboardId: UUID;
    lng: Language;
}) {
    const { scoreboardId } = props;

    const {
        boerenbridgePlayer: { get: getPlayers },
        boerenbridgeGame: { get: getBoerenbridgeGame },
    } = apiRoutes;

    const game = await getBoerenbridgeGame(scoreboardId);
    const players = await getPlayers(scoreboardId, game.id);

    const rounds = players.reduce<Array<Round>>((acc, currentValue) => {
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

    console.log(rounds);

    return <Box>Component</Box>;
}
