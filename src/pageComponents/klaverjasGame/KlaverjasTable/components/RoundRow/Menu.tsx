"use client";

import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { DeleteRounded, EditRounded, MoreVertRounded } from "@mui/icons-material";
import { MergedRound } from "@/pageComponents/klaverjasGame/KlaverjasTable/interfaces";
import { useState } from "react";
import Link from "next/link";
import { UUID } from "crypto";
import DeleteRoundDialog from "@/pageComponents/klaverjasGame/DeleteRoundDialog";
import { useTranslations } from "next-intl";
import { deleteRound } from "@/actions/klaverjasActions";

type Props = {
    scoreboardId: UUID;
    isLastRound: boolean;
    round: MergedRound;
};

export default function RoundMenu({ scoreboardId, isLastRound, round }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>();

    const t = useTranslations("scoreboardCurrentPage");

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
        void deleteRound(scoreboardId, round.roundNumber);

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
                        <Typography variant="body2">{t("table.edit")}</Typography>
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
                                    {t("table.delete")}
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
