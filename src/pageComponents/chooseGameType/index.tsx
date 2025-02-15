import { Button, Grid2 } from "@mui/material";
import { GAME_TYPE } from "@/constants/gameType";
import GameTypeTile from "@/components/gameTypeTile";
import { useState } from "react";
import { AppGameType } from "@/models/app/scoreboard/GameType";
import { useTranslations } from "next-intl";

type Props = {
    onSubmit: (gameType: AppGameType) => void;
};

export default function ChooseGameType(props: Props) {
    const { onSubmit } = props;

    const t = useTranslations("scoreboardCreatePage");

    const gameTypes = Object.values(GAME_TYPE);

    const [selectedGameType, setSelectedGameType] = useState<AppGameType | null>(
        null,
    );

    function handleGameTypeClick(gameType: AppGameType) {
        setSelectedGameType((prevGameType) => {
            if (prevGameType === gameType) {
                return null;
            }

            return gameType;
        });
    }

    return (
        <Grid2 container direction="column" spacing={2}>
            <Grid2 container direction="row">
                {gameTypes.map((gameType) => (
                    <Grid2 key={gameType}>
                        <GameTypeTile
                            disabled={gameType === GAME_TYPE.BOERENBRIDGE}
                            gameType={gameType}
                            selected={gameType === selectedGameType}
                            onClick={() => handleGameTypeClick(gameType)}
                        />
                    </Grid2>
                ))}
            </Grid2>
            <Grid2 alignSelf="end">
                <Button
                    variant="contained"
                    onClick={() => {
                        if (selectedGameType == null) {
                            return;
                        }
                        onSubmit(selectedGameType);
                    }}
                >
                    {t("continue")}
                </Button>
            </Grid2>
        </Grid2>
    );
}
