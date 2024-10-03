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
import { MergedRound } from "pages/RootPage/subPages/ScoreBoardPage/components/CurrentGame/components/KlaverjasTable/interfaces";
import { useState } from "react";

export default function RoundRow(props: {
    round: MergedRound;
    onEditClick?: (round: MergedRound) => void;
    onDeleteClick?: (round: MergedRound) => void;
}) {
    const { round, onDeleteClick, onEditClick } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>();

    return (
        <TableRow key={round.roundNumber}>
            <TableCell align="right" variant="body" sx={{ width: 10, padding: 1 }}>
                {round.roundNumber}
            </TableCell>
            <TableCell variant="body" sx={{ width: 0.5, padding: 1 }} align="right">
                {round.team1.points}
            </TableCell>
            <TableCell variant="body" sx={{ width: 0.5, padding: 1 }} align="right">
                {round.team2.points}
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
                            <Typography variant="body2">Edit</Typography>
                        </Stack>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            onDeleteClick?.(round);
                        }}
                    >
                        <Stack direction="row" gap={1} alignItems="center">
                            <DeleteRounded sx={{ height: 20, width: 20 }} />
                            <Typography variant="body2">Delete</Typography>
                        </Stack>
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
}
