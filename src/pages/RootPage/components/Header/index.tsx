import { AddRounded, LogoutRounded, ScoreboardRounded } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFetcher } from "react-router-dom";

export default function Header() {
    const fetcher = useFetcher();

    return (
        <Grid2 container alignItems="center" padding={2} spacing={2}>
            <Grid2 sx={{ height: 46 }}>
                <ScoreboardRounded color="primary" sx={{ height: 30, width: 30 }} />
            </Grid2>
            <Grid2 xs>
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
