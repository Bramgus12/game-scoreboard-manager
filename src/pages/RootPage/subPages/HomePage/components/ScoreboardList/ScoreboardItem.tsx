import { Button, Grid2, Typography, useTheme } from "@mui/material";
import { AppScoreboard } from "models/app/scoreboard/Scoreboard";
import {
    ArrowForwardRounded,
    CalendarToday,
    CasinoRounded,
    ScoreboardRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ScoreboardItem(props: {
    scoreboard: AppScoreboard;
    linkTo: string;
}) {
    const { scoreboard, linkTo } = props;
    const theme = useTheme();

    const formattedDate = scoreboard.createdAt.toLocaleDateString("en-GB", {
        dateStyle: "full",
    });

    const formattedTime = scoreboard.createdAt.toLocaleTimeString("en-GB", {
        timeStyle: "short",
    });

    return (
        <Button
            sx={{
                padding: 2,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 4,
                display: "block",
                textTransform: "unset",
                textAlign: "left",
                color: theme.palette.text.primary,
            }}
            to={linkTo}
            component={Link}
        >
            <Grid2 container alignItems="center">
                <Grid2 container spacing={2} alignItems="center" size="grow">
                    <Grid2 container alignItems="center" spacing={1} size={12}>
                        <Grid2 height={32}>
                            <ScoreboardRounded />
                        </Grid2>
                        <Grid2>
                            <Typography variant="h6">
                                {scoreboard.scoreboardName}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Grid2 container alignItems="center" spacing={1}>
                        <Grid2 height={16}>
                            <CasinoRounded sx={{ width: 16, height: 16 }} />
                        </Grid2>
                        <Grid2>
                            <Typography variant="caption">
                                {scoreboard.gameType}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Grid2 container alignItems="center" spacing={1}>
                        <Grid2 height={16}>
                            <CalendarToday sx={{ width: 16, height: 16 }} />
                        </Grid2>
                        <Grid2>
                            <Typography variant="caption">
                                {`${formattedDate} at ${formattedTime}`}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 height={24}>
                    <ArrowForwardRounded />
                </Grid2>
            </Grid2>
        </Button>
    );
}
