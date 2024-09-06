import { RestoreRounded } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function StepTwo() {
    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12}>
                <Typography variant="h5">Keep track of fame.</Typography>
            </Grid2>
            <Grid2 xs={6} container direction="column" alignItems="center">
                <Grid2>
                    <Typography variant="body1">Us</Typography>
                </Grid2>
                <Grid2>
                    <Box
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.primary.main}`,
                            padding: (theme) => theme.spacing(1, 1.5),
                            borderRadius: 4,
                        }}
                    >
                        <Typography variant="h4" sx={{ width: 1, textAlign: "center" }}>
                            <code>100</code>
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Button>20</Button>
                        <Button>50</Button>
                        <Button>100</Button>
                        <Button>
                            <RestoreRounded />
                        </Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <Grid2 xs={6} container direction="column" alignItems="center">
                <Grid2>
                    <Typography variant="body1">Them</Typography>
                </Grid2>
                <Grid2>
                    <Box
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.primary.main}`,
                            padding: (theme) => theme.spacing(1, 1.5),
                            borderRadius: 4,
                        }}
                    >
                        <Typography variant="h4" sx={{ width: 1, textAlign: "center" }}>
                            <code>50</code>
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Button>20</Button>
                        <Button>50</Button>
                        <Button>100</Button>
                        <Button>
                            <RestoreRounded />
                        </Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
