import {
    IconButton,
    Menu,
    MenuItem,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { DeleteRounded, EditRounded, MoreVertRounded } from "@mui/icons-material";
import { useState } from "react";
import { MergedRound } from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/interfaces";
import PointsCell from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/components/RoundRow/PointsCell";
import { useTranslation } from "react-i18next";

export default function RoundRow(props: {
    round: MergedRound;
    isLastRound: boolean;
    onEditClick?: (round: MergedRound) => void;
    onDeleteClick?: (round: MergedRound) => void;
}) {
    const { round, onDeleteClick, onEditClick, isLastRound } = props;

    const { t } = useTranslation("scoreboardCurrentPage");

    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>();

    return (
        <TableRow key={round.roundNumber}>
            <TableCell align="right" variant="body" sx={{ width: 10, padding: 1 }}>
                {round.roundNumber}
            </TableCell>
            <TableCell variant="body" sx={{ width: 0.5, padding: 1 }} align="right">
                <PointsCell round={round} team="team1" />
            </TableCell>
            <TableCell variant="body" sx={{ width: 0.5, padding: 1 }} align="right">
                <PointsCell round={round} team="team2" />
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
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
                            <Typography variant="body2">
                                {t("table.edit")}
                            </Typography>
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
                                <Typography variant="body2">
                                    {t("table.delete")}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    ) : null}
                </Menu>
            </TableCell>
        </TableRow>
    );
}
