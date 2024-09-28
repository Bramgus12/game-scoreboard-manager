import { AddRounded, LogoutRounded, ScoreboardRounded } from "@mui/icons-material";
import { Button, Grid2, IconButton, Typography } from "@mui/material";
import { useFetcher } from "react-router-dom";

export default function Header() {
    const fetcher = useFetcher();

    return (
        <Grid2 container alignItems="center" padding={2} spacing={2}>
            <Grid2 sx={{ height: 46 }}>
                <ScoreboardRounded color="primary" sx={{ height: 30, width: 30 }} />
            </Grid2>
            <Grid2 size="grow">
                <Typography variant="h5">Game Scoreboard Manager</Typography>
            </Grid2>
            <Grid2 container>
                <Grid2>
                    <Button variant="contained" startIcon={<AddRounded />}>
                        Create new scoreboard
                    </Button>
                </Grid2>
                <Grid2>
                    <fetcher.Form method="post" action="/logout">
                        <IconButton type="submit">
                            <LogoutRounded />
                        </IconButton>
                    </fetcher.Form>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
