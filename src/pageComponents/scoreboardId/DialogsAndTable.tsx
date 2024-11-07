"use client";

import NewRoundDialog from "@/pageComponents/scoreboardId/NewRoundDialog";
import DeleteRoundDialog from "@/pageComponents/scoreboardId/DeleteRoundDialog";
import { useState } from "react";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import useRoundMutator from "@/utils/api/mutators/useRoundMutator";
import { UUID } from "crypto";
import KlaverjasTable from "@/pageComponents/scoreboardId/KlaverjasTable";
import { Fab } from "@mui/material";
import { FiberNewRounded } from "@mui/icons-material";

export default function DialogsAndTable({ id }: { id: UUID }) {
    const [isNewRoundDialogOpen, setIsNewRoundDialogOpen] = useState(false);
    const [deleteDialogState, setDeleteDialogState] = useState<{
        isOpen: boolean;
        mergedRound: MergedRound | undefined;
    }>({ isOpen: false, mergedRound: undefined });

    const [currentEditRound, setCurrentEditRound] = useState<
        MergedRound | undefined
    >();

    const { deleteRoundMutation } = useRoundMutator();

    return (
        <>
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
            <Fab
                color="primary"
                variant="extended"
                sx={{ position: "fixed", bottom: 25, right: 25 }}
                onClick={() => setIsNewRoundDialogOpen(true)}
            >
                <FiberNewRounded sx={{ marginRight: 1 }} />
                {"New Round"}
            </Fab>
        </>
    );
}
