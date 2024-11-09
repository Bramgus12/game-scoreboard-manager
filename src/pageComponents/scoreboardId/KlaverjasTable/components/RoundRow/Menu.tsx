"use client";

import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { DeleteRounded, EditRounded, MoreVertRounded } from "@mui/icons-material";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { useState } from "react";
import Link from "next/link";
import { UUID } from "crypto";
import DeleteRoundDialog from "@/pageComponents/scoreboardId/DeleteRoundDialog";
import { deleteRound } from "@/app/[lng]/scoreboard/[id]/actions";

type Props = {
    scoreboardId: UUID;
    isLastRound: boolean;
    round: MergedRound;
};

export default function RoundMenu({ scoreboardId, isLastRound, round }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>();

    const [deleteDialogState, setDeleteDialogState] = useState<{
        isOpen: boolean;
        round: MergedRound | null;
    }>({
        isOpen: false,
        round: null,
    });

    function handleCloseDialog() {
        setDeleteDialogState({
            isOpen: false,
            round: null,
        });
    }

    function handleOpenDialog() {
        setDeleteDialogState({
            isOpen: true,
            round: round,
        });
    }

    function handleDeleteRound() {
        void deleteRound(scoreboardId, round.team1.klaverjasTeam, round.team1.id);
        void deleteRound(scoreboardId, round.team2.klaverjasTeam, round.team2.id);

        handleCloseDialog();
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton
                size="small"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <MoreVertRounded />
            </IconButton>
            <Menu
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            >
                <MenuItem
                    component={Link}
                    href={`/scoreboard/${scoreboardId}/round/${round.roundNumber}`}
                >
                    <Stack direction="row" gap={1} alignItems="center">
                        <EditRounded sx={{ height: 20, width: 20 }} />
                        <Typography variant="body2">{"Edit round"}</Typography>
                    </Stack>
                </MenuItem>
                {isLastRound ? (
                    <>
                        <MenuItem
                            onClick={() => {
                                handleOpenDialog();
                            }}
                        >
                            <Stack direction="row" gap={1} alignItems="center">
                                <DeleteRounded sx={{ height: 20, width: 20 }} />
                                <Typography variant="body2">
                                    {"Delete round"}
                                </Typography>
                            </Stack>
                        </MenuItem>
                        <DeleteRoundDialog
                            open={deleteDialogState.isOpen}
                            onClose={handleCloseDialog}
                            onSubmit={handleDeleteRound}
                        />
                    </>
                ) : null}
            </Menu>
        </>
    );
}
