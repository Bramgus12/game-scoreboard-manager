"use client";

import { useState } from "react";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { useIsFetching } from "@tanstack/react-query";
import { Fab, Grid2 } from "@mui/material";
import KlaverjasGameTitle from "@/pageComponents/scoreboardId/KlaverjasGameTitle";
import KlaverjasTable from "@/pageComponents/scoreboardId/KlaverjasTable";
import CurrentRoundNumber from "@/pageComponents/scoreboardId/CurrentRoundNumber";
import Totals from "@/pageComponents/scoreboardId/Totals";
import { FiberNewRounded } from "@mui/icons-material";
import { UUID } from "crypto";
import DeleteRoundDialog from "@/pageComponents/scoreboardId/DeleteRoundDialog";
import NewRoundDialog from "@/pageComponents/scoreboardId/NewRoundDialog";
import useRoundMutator from "@/utils/api/mutators/useRoundMutator";

export default function ScoreboardId({ id }: { id: UUID }) {
    const [isNewRoundDialogOpen, setIsNewRoundDialogOpen] = useState(false);
    const [deleteDialogState, setDeleteDialogState] = useState<{
        isOpen: boolean;
        mergedRound: MergedRound | undefined;
    }>({ isOpen: false, mergedRound: undefined });

    const isFetching = useIsFetching();

    const [currentEditRound, setCurrentEditRound] = useState<
        MergedRound | undefined
    >();

    const { deleteRoundMutation } = useRoundMutator();

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <KlaverjasGameTitle id={id} />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <KlaverjasTable
                        id={id}
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
                        <CurrentRoundNumber id={id} />
                    </Grid2>
                    <Grid2>
                        <Totals id={id} />
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
                {"New Round"}
            </Fab>
            <NewRoundDialog
                id={id}
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
                        void deleteRoundMutation(
                            id,
                            deleteDialogState.mergedRound.team1.klaverjasTeam,
                            deleteDialogState.mergedRound.team1.id,
                        );
                        void deleteRoundMutation(
                            id,
                            deleteDialogState.mergedRound.team2.klaverjasTeam,
                            deleteDialogState.mergedRound.team2.id,
                        );
                    }
                    setDeleteDialogState({ isOpen: false, mergedRound: undefined });
                }}
            />
        </>
    );
}
