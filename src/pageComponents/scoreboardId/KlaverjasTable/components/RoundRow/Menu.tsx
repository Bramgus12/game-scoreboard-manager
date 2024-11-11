"use client";

import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { DeleteRounded, EditRounded, MoreVertRounded } from "@mui/icons-material";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { useState } from "react";
import Link from "next/link";
import { UUID } from "crypto";
import DeleteRoundDialog from "@/pageComponents/scoreboardId/DeleteRoundDialog";
import { deleteRound } from "@/app/[lng]/scoreboard/[id]/actions";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";

type Props = {
    scoreboardId: UUID;
    isLastRound: boolean;
    round: MergedRound;
    lng: Language;
};

export default function RoundMenu({ lng, scoreboardId, isLastRound, round }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>();

    const { t } = useTranslation(lng, "scoreboardCurrentPage");

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
                    href={`/${lng}/scoreboard/${scoreboardId}/round/${round.roundNumber}`}
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
                            lng={lng}
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
