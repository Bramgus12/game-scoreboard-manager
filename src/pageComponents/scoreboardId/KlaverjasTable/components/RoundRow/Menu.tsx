"use client";

import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { DeleteRounded, EditRounded, MoreVertRounded } from "@mui/icons-material";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { useState } from "react";

type Props = {
    isLastRound: boolean;
    onDeleteClick?: (round: MergedRound) => void;
    onEditClick?: (round: MergedRound) => void;
    round: MergedRound;
};

export default function RoundMenu({
    isLastRound,
    onDeleteClick,
    onEditClick,
    round,
}: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>();

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
                    onClick={() => {
                        setAnchorEl(null);
                        onEditClick?.(round);
                    }}
                >
                    <Stack direction="row" gap={1} alignItems="center">
                        <EditRounded sx={{ height: 20, width: 20 }} />
                        <Typography variant="body2">{"Edit round"}</Typography>
                    </Stack>
                </MenuItem>
                {isLastRound ? (
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            onDeleteClick?.(round);
                        }}
                    >
                        <Stack direction="row" gap={1} alignItems="center">
                            <DeleteRounded sx={{ height: 20, width: 20 }} />
                            <Typography variant="body2">{"Delete round"}</Typography>
                        </Stack>
                    </MenuItem>
                ) : null}
            </Menu>
        </>
    );
}
