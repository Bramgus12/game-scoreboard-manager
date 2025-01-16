"use client";

import { alpha, Button, Grid2, Typography } from "@mui/material";
import { AppGameType } from "@/models/app/scoreboard/GameType";
import { CheckRounded } from "@mui/icons-material";
import PlayingCardsIcon from "@/components/icons/PlayingCardsIcon";

type Props = {
    gameType: AppGameType;
    onClick?: () => void;
    selected?: boolean;
};

export default function GameTypeTile(props: Props) {
    const { selected = false, onClick, gameType } = props;

    return (
        <Button
            sx={(theme) => ({
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.text.primary,
                padding: 2,
                borderRadius: 4,
                height: 175,
                width: 175,
                textTransform: "capitalize",
                background: selected
                    ? alpha(theme.palette.primary.dark, 0.2)
                    : "transparent",
                ":hover": {
                    background: alpha(
                        theme.palette.primary.dark,
                        selected ? 0.3 : 0.1,
                    ),
                },
            })}
            onClick={onClick}
        >
            <Grid2
                container
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ height: 1, width: 1 }}
            >
                <Grid2
                    container
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: 1 }}
                >
                    <Grid2>
                        {gameType === "klaverjas" || gameType === "boerenbridge" ? (
                            <PlayingCardsIcon sx={{ width: 40, height: 40 }} />
                        ) : (
                            <Typography variant="h4" sx={{ marginTop: -1 }}>
                                🀁
                            </Typography>
                        )}
                    </Grid2>
                    {selected ? (
                        <Grid2>
                            <CheckRounded color="primary" />
                        </Grid2>
                    ) : null}
                </Grid2>
                <Grid2>
                    <Typography variant="subtitle1">
                        <code>{gameType}</code>
                    </Typography>
                </Grid2>
            </Grid2>
        </Button>
    );
}
