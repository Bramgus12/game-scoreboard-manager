import { Fab, Grid2 } from "@mui/material";
import { useIsFetching } from "@tanstack/react-query";
import KlaverjasGameTitle from "pages/app.scoreboard.$scoreboardId/components/KlaverjasGameTitle";
import KlaverjasTable from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable";
import { useState } from "react";
import CurrentRoundNumber from "pages/app.scoreboard.$scoreboardId/components/CurrentRoundNumber";
import Totals from "pages/app.scoreboard.$scoreboardId/components/Totals";
import { FiberNewRounded } from "@mui/icons-material";
import NewRoundDialog from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog";
import { MergedRound } from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/interfaces";
import useKlaverjasRoundMutation from "utils/api/mutators/useKlaverjasRoundMutation";
import { useParams } from "@tanstack/react-router";
import { UUID } from "crypto";
import DeleteRoundDialog from "pages/app.scoreboard.$scoreboardId/components/DeleteRoundDialog";
import { useTranslation } from "react-i18next";

export default function EditScoreboard() {
    const [isNewRoundDialogOpen, setIsNewRoundDialogOpen] = useState(false);
    const [deleteDialogState, setDeleteDialogState] = useState<{
        isOpen: boolean;
        mergedRound: MergedRound | undefined;
    }>({ isOpen: false, mergedRound: undefined });

    const { t } = useTranslation("scoreboardCurrentPage");

    const { scoreboardId } = useParams({ from: "/app/scoreboard/$scoreboardId" });

    const id = scoreboardId as UUID;

    const [currentEditRound, setCurrentEditRound] = useState<
        MergedRound | undefined
    >();

    const isFetching = useIsFetching();

    const { deleteKlaverjasRound } = useKlaverjasRoundMutation();

    function handleDeleteRound(mergedRound: MergedRound) {
        void deleteKlaverjasRound(
            id,
            mergedRound.team1.klaverjasTeam,
            mergedRound.team1.id,
        );
        void deleteKlaverjasRound(
            id,
            mergedRound.team2.klaverjasTeam,
            mergedRound.team2.id,
        );
    }

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <KlaverjasGameTitle />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <KlaverjasTable
                        onNewRoundClick={() => setIsNewRoundDialogOpen(true)}
                        onEditClick={(mergedRound) => {
                            setCurrentEditRound(mergedRound);
                            setIsNewRoundDialogOpen(true);
                        }}
                        onDeleteClick={(mergedRound) =>
                            setDeleteDialogState({ isOpen: true, mergedRound })
                        }
                    />
                </Grid2>
                <Grid2 container direction="column" size={{ xs: 12, md: 6 }}>
                    <Grid2>
                        <CurrentRoundNumber />
                    </Grid2>
                    <Grid2>
                        <Totals />
                    </Grid2>
                </Grid2>
            </Grid2>
            <Fab
                color="primary"
                variant="extended"
                sx={{ position: "fixed", bottom: 25, right: 25 }}
                onClick={() => setIsNewRoundDialogOpen(true)}
                disabled={isFetching > 0}
            >
                <FiberNewRounded sx={{ marginRight: 1 }} />
                {t("newRound")}
            </Fab>
            <NewRoundDialog
                open={isNewRoundDialogOpen}
                onClose={() => setIsNewRoundDialogOpen(false)}
                initialState={currentEditRound}
            />
            <DeleteRoundDialog
                open={deleteDialogState.isOpen}
                onClose={() =>
                    setDeleteDialogState({ isOpen: false, mergedRound: undefined })
                }
                onSubmit={() => {
                    if (deleteDialogState.mergedRound != null) {
                        handleDeleteRound(deleteDialogState.mergedRound);
                    }
                    setDeleteDialogState({ isOpen: false, mergedRound: undefined });
                }}
            />
        </>
    );
}
